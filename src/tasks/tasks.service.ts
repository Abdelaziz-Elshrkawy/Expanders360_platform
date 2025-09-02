import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { Project } from 'src/entities/mysql/project.entity';
import { EmailService } from 'src/tasks/emails.service';
import { Match } from 'src/entities/mysql/match.entity';
import { Vendor } from 'src/entities/mysql/vendor.entity';
import { InjectSqlRepository } from 'src/decorators/injection/repository.decorator';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectSqlRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectSqlRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
    @InjectSqlRepository(Match)
    private matchRepository: Repository<Match>,
    @Inject(forwardRef(() => EmailService))
    private emailService: EmailService, // Inject EmailService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleRefreshMatches() {
    this.logger.debug('Called when the schedule refreshes matches');
    // Logic to refresh matches for active projects
    const activeProjects = await this.projectRepository.find({
      where: { status: 'active' },
    });

    for (const project of activeProjects) {
      // Rebuild matches for the project
      await this.rebuildMatches(project);
    }
  }

  async rebuildMatches(project: Project) {
    this.logger.debug(`Rebuilding matches for project ${project.id}`);

    const vendors = await this.vendorRepository
      .createQueryBuilder('vendor')
      .leftJoinAndSelect('vendor.countriesSupported', 'country')
      .leftJoinAndSelect('vendor.servicesOffered', 'service')
      .where('country.name = :country', { country: project.country })
      .getMany();

    for (const vendor of vendors) {
      const servicesOverlap = project.servicesNeeded.filter((service) =>
        vendor.servicesOffered.some(
          (vendorService) => vendorService.id === service.id,
        ),
      ).length;

      if (servicesOverlap > 0) {
        const slaWeight = vendor.responseSlaHours <= 24 ? 5 : 0;
        const score = servicesOverlap * 2 + vendor.rate + slaWeight;

        let match = await this.matchRepository.findOne({
          where: { project: { id: project.id }, vendor: { id: vendor.id } },
        });

        if (!match) {
          match = this.matchRepository.create({ project, vendor, score });
        } else {
          match.score = score;
        }

        await this.matchRepository.save(match);

        try {
          await this.emailService.sendNewMatchNotification(
            project,
            vendor,
            score,
          );
        } catch (error) {
          this.logger.error(
            `Error sending email notification: ${error.message}`,
          );
        }
      }
    }
  }
}

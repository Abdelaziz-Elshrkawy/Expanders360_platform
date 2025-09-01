import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from 'cron';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { Vendor } from '../vendors/entities/vendor.entity';
import { Match } from '../matches/entities/match.entity';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service'; // Assuming you have an EmailService

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    private configService: ConfigService,
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

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async handleFlagExpiredSlas() {
    this.logger.debug(
      'Called when the schedule flags vendors with expired SLAs',
    );
    // Logic to flag vendors with expired SLAs
    const vendors = await this.vendorRepository.find();
    const now = new Date();

    for (const vendor of vendors) {
      const slaExpiration = new Date(
        now.getTime() - vendor.responseSlaHours * 60 * 60 * 1000,
      ); // Calculate SLA expiration time

      // Example: If a vendor hasn't responded to a project in the last SLA hours, flag them
      // This requires you to have a way to track vendor responses (e.g., a 'last_response_date' field)
      // if (vendor.last_response_date < slaExpiration) {
      //   vendor.is_flagged = true;
      //   await this.vendorRepository.save(vendor);
      //   this.logger.warn(`Vendor ${vendor.name} SLA expired`);
      // }
    }
  }

  private async rebuildMatches(project: Project) {
    // Matching rules:
    // 1. Vendors must cover the same country
    // 2. At least one service overlap
    // 3. Score formula: services_overlap * 2 + rating + SLA_weight

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
        const slaWeight = vendor.responseSlaHours <= 24 ? 5 : 0; // Example SLA weight
        const score = servicesOverlap * 2 + vendor.rating + slaWeight;

        // Upsert logic (find existing match or create new)
        let match = await this.matchRepository.findOne({
          where: { project: { id: project.id }, vendor: { id: vendor.id } },
        });

        if (!match) {
          match = this.matchRepository.create({ project, vendor, score });
        } else {
          match.score = score;
        }

        await this.matchRepository.save(match);

        // Send email notification (assuming you have an EmailService)
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

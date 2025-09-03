import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from '../../entities/mysql/project.entity';
import { CreateProjectDto } from '../../dtos/project.dto';
import { UpdateProjectDto } from '../../dtos/project.dto';
import { Service } from '../../entities/mysql/service.entity';
import { InjectSqlRepository } from 'src/decorators/injection/repository.decorator';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectSqlRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { clientId, countryId, servicesNeeded, budget, status } =
      createProjectDto;

    const project = this.projectRepository.create({
      client: { id: clientId },
      country_id: countryId,
      servicesNeeded: servicesNeeded.map((id) => ({ id }) as Service),
      budget,
      status,
    });

    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({
      relations: ['client', 'servicesNeeded'],
    });
  }

  async findOne(id: number): Promise<Project | null> {
    return await this.projectRepository.findOne({
      where: { id },
      relations: ['client', 'servicesNeeded', 'country'],
    });
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOne(id);
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }

    Object.assign(project, updateProjectDto);
    return this.projectRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const project = await this.findOne(id);
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }
    await this.projectRepository.remove(project);
  }
}

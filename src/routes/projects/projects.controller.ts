import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TasksService } from '../../tasks/tasks.service';
import { CreateProjectDto, UpdateProjectDto } from 'src/dtos/project.dto';
import { Role } from 'src/decorators/classes-methods/role.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { RolesE } from 'src/types/enums';

@Role([RolesE.CLIENT])
@UseGuards(AuthorizationGuard, RoleGuard)
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  @Role([RolesE.ADMIN, RolesE.CLIENT])
  @Post(':id/matches/rebuild')
  async rebuildMatches(@Param('id') id: string) {
    const project = await this.projectsService.findOne(+id);
    if (!project) {
      throw new BadRequestException(`Project with ID ${id} not found`);
    }
    await this.tasksService.rebuildMatches(project);
    return { message: `Matches rebuilt for project ${id}` };
  }
}

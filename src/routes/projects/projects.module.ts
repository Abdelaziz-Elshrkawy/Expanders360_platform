import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../entities/mysql/project.entity';
import { TasksModule } from '../../tasks/tasks.module';
import { ServicesModule } from '../services/services.module';
import { CountriesModule } from '../countries/countries.module';
import { sql_database_type } from 'src/config/env';
import { Country } from 'src/entities/mysql/country.entity';
import { Service } from 'src/entities/mysql/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Service, Country], sql_database_type),
    TasksModule, // Import TasksModule
    ServicesModule,
    CountriesModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}

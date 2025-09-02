import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/entities/mysql/match.entity';
import { Project } from 'src/entities/mysql/project.entity';
import { Vendor } from 'src/entities/mysql/vendor.entity';
import { EmailService } from './emails.service';
import { sql_database_type } from 'src/config/env';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Vendor, Match], sql_database_type),
  ],
  providers: [TasksService, EmailService],
  exports: [TasksService],
})
export class TasksModule {}

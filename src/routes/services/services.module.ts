import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/entities/mysql/service.entity';
import { sql_database_type } from 'src/config/env';

@Module({
  imports: [TypeOrmModule.forFeature([Service], sql_database_type)],
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}

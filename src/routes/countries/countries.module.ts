import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/entities/mysql/country.entity';
import { sql_database_type } from 'src/config/env';

@Module({
  imports: [TypeOrmModule.forFeature([Country], sql_database_type)],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}

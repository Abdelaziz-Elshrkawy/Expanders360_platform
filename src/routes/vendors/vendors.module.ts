import { Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from 'src/entities/mysql/vendor.entity';
import { sql_database_type } from 'src/config/env';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor], sql_database_type)],
  controllers: [VendorsController],
  providers: [VendorsService],
  exports: [VendorsService],
})
export class VendorsModule {}

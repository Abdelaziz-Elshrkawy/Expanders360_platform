import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from 'src/dtos/vendors.dto';
import { Vendor } from 'src/entities/mysql/vendor.entity';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Post()
  create(@Body() createVendorDto: CreateVendorDto): Promise<Vendor> {
    return this.vendorsService.create(createVendorDto);
  }

  @Get()
  findAll(): Promise<Vendor[]> {
    return this.vendorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vendor | null> {
    return await this.vendorsService.findOne(+id);
  }
}

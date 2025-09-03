import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from 'src/dtos/vendors.dto';
import { Vendor } from 'src/entities/mysql/vendor.entity';
import { Role } from 'src/decorators/classes-methods/role.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { RolesE } from 'src/types/enums';

@Role([RolesE.ADMIN])
@UseGuards(AuthorizationGuard, RoleGuard)
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

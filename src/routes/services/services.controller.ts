import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from 'src/entities/mysql/service.entity';
import { CreateServiceDto } from 'src/dtos/service.dto';
import { Role } from 'src/decorators/classes-methods/role.decorator';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { RolesE } from 'src/types/enums';

@Role([RolesE.ADMIN])
@UseGuards(AuthorizationGuard, RoleGuard)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(
    @Body() createServiceDto: CreateServiceDto,
  ): Promise<Service | null> {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  async findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Service | null> {
    return this.servicesService.findOne(+id);
  }
}

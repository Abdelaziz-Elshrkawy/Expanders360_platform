import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from 'src/entities/mysql/service.entity';
import { CreateServiceDto } from 'src/dtos/service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Service> {
    return this.servicesService.findOne(+id);
  }
}

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from 'src/dtos/country.dto';
import { Country } from 'src/entities/mysql/country.entity';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  findAll(): Promise<Country[]> {
    return this.countriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Country | null> {
    return this.countriesService.findOne(+id);
  }
}

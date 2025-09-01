import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Country } from 'src/entities/mysql/country.entity';
import { CreateCountryDto } from 'src/dtos/country.dto';
import { InjectSqlRepository } from 'src/decorators/injection/repository.decorator';

@Injectable()
export class CountriesService {
  constructor(
    @InjectSqlRepository(Country)
    private countriesRepository: Repository<Country>,
  ) {}

  async findAll(): Promise<Country[]> {
    return this.countriesRepository.find();
  }

  async findOne(id: number): Promise<Country | null> {
    return this.countriesRepository.findOneBy({ id });
  }

  async create(country: CreateCountryDto): Promise<Country> {
    return this.countriesRepository.save(country);
  }

  async update(id: number, country: Partial<Country>): Promise<Country | null> {
    await this.countriesRepository.update(id, country);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.countriesRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Service } from 'src/entities/mysql/service.entity';
import { InjectSqlRepository } from 'src/decorators/injection/repository.decorator';

@Injectable()
export class ServicesService {
  constructor(
    @InjectSqlRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(serviceData: Partial<Service>): Promise<Service | null> {
    const service = this.serviceRepository.create(serviceData);
    return this.serviceRepository.save(service);
  }

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async findOne(id: number): Promise<Service | null> {
    return await this.serviceRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    serviceData: Partial<Service>,
  ): Promise<Service | null> {
    await this.serviceRepository.update(id, serviceData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}

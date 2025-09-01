import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(serviceData: Partial<Service>): Promise<Service> {
    const service = this.serviceRepository.create(serviceData);
    return this.serviceRepository.save(service);
  }

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async findOne(id: number): Promise<Service> {
    return this.serviceRepository.findOne(id);
  }

  async update(id: number, serviceData: Partial<Service>): Promise<Service> {
    await this.serviceRepository.update(id, serviceData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.serviceRepository.delete(id);
  }
}

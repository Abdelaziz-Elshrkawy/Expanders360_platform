import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private vendorsRepository: Repository<Vendor>,
  ) {}

  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const vendor = this.vendorsRepository.create(createVendorDto);
    return this.vendorsRepository.save(vendor);
  }

  async findAll(): Promise<Vendor[]> {
    return this.vendorsRepository.find();
  }

  async findOne(id: number): Promise<Vendor> {
    return this.vendorsRepository.findOne(id);
  }

  async update(id: number, updateVendorDto: UpdateVendorDto): Promise<Vendor> {
    await this.vendorsRepository.update(id, updateVendorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.vendorsRepository.delete(id);
  }
}

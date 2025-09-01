import { Injectable } from '@nestjs/common';
import { InjectSqlRepository } from 'src/decorators/injection/repository.decorator';
import { CreateVendorDto, UpdateVendorDto } from 'src/dtos/vendors.dto';
import { Vendor } from 'src/entities/mysql/vendor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VendorsService {
  constructor(
    @InjectSqlRepository(Vendor)
    private vendorsRepository: Repository<Vendor>,
  ) {}

  async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const vendor = this.vendorsRepository.create(createVendorDto);
    return this.vendorsRepository.save(vendor);
  }

  async findAll(): Promise<Vendor[]> {
    return this.vendorsRepository.find();
  }

  async findOne(id: number): Promise<Vendor | null> {
    return await this.vendorsRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateVendorDto: UpdateVendorDto,
  ): Promise<Vendor | null> {
    await this.vendorsRepository.update(id, updateVendorDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.vendorsRepository.delete(id);
  }
}

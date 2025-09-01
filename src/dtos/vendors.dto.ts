import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class CreateVendorDto {
  @IsString()
  name: string;

  @IsNumber()
  responseHours: number;
}

export class UpdateVendorDto extends PartialType(CreateVendorDto) {}

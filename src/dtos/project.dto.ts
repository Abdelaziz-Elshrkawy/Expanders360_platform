import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  servicesNeeded: number[];

  @IsNotEmpty()
  @IsNumber()
  budget: number;

  @IsString()
  status: string;
}

export class UpdateProjectDto {
  @IsNumber()
  clientId?: number;

  @IsString()
  country?: string;

  servicesNeeded?: number[];

  @IsNumber()
  budget?: number;

  @IsString()
  status?: string;
}

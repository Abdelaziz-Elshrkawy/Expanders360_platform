import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { RolesE } from 'src/types/enums';

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CreateUserDto extends UserLoginDto {
  @IsEnum(RolesE)
  @IsOptional()
  role?: RolesE;
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsEnum(RolesE)
  @IsOptional()
  role?: RolesE;
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  HttpStatus,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserLoginDto } from 'src/dtos/users.dto';
import { User } from 'src/entities/mysql/users.entity';
import { Response } from 'express';
import { CookiesName, Exceptions } from 'src/types/enums';
import { ResponseObjectGenerator } from 'src/helpers/helpers';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Res() res: Response, @Body() body: UserLoginDto) {
    try {
      const result = (await this.usersService.login(body)) as {
        username: string;
        email: string;
        role: string;
        institute_id: number;
        jwt: string;
      };
      if (result) {
        const { jwt, ...userData } = result;
        ResponseObjectGenerator<
          Omit<Awaited<ReturnType<typeof this.usersService.login>>, 'jwt'>
        >(userData, HttpStatus.OK, res, [
          {
            name: CookiesName.Jwt_Token,
            value: jwt,
            options: {
              httpOnly: true,
              secure: true,
              maxAge: 1000 * 60 * 60 * 24,
              sameSite: 'strict',
            },
          },
        ]);
      } else {
        throw new Error(Exceptions.Not_Authorized);
      }
    } catch (e) {
      const err = e as Error;
      if (
        ((err.message as Exceptions) || undefined) === Exceptions.Not_Authorized
      ) {
        throw new UnauthorizedException();
      } else if (
        (err.message as Exceptions) === Exceptions.User_Need_Signed_Up
      ) {
        throw new BadRequestException(Exceptions.User_Need_Signed_Up);
      }
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User | User[]> {
    return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.findOne(+id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}

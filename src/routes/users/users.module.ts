import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/mysql/users.entity';
import { PasswordService } from 'src/shared/services/password.service';
import { sql_database_type } from 'src/config/env';

@Module({
  imports: [TypeOrmModule.forFeature([User], sql_database_type)],
  controllers: [UsersController],
  providers: [UsersService, PasswordService],
  exports: [UsersService],
})
export class UsersModule {}

import { Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { database_type, sql_database_type } from 'src/config/env';

export const InjectSqlRepository = <T>(entity: Type<T>) =>
  InjectRepository(entity, sql_database_type);

export const InjectMongoDBRepository = <T>(entity: Type<T>) =>
  InjectRepository(entity, database_type);

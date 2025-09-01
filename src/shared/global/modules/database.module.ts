import { TypeOrmModule } from '@nestjs/typeorm';
import {
  database_host,
  database_name,
  database_password,
  database_type,
  database_username,
  sql_database_host,
  sql_database_name,
  sql_database_password,
  sql_database_type,
  sql_database_username,
} from 'src/config/env';
import { OrmDatabaseType } from 'src/types/types';

/**
 * MySQL database connection config
 */
export const sqlConnection = TypeOrmModule.forRoot({
  name: sql_database_type,
  type: sql_database_type as OrmDatabaseType,
  database: sql_database_name,
  host: sql_database_host,
  username: sql_database_username,
  password: sql_database_password,
  entities: [],
});

/**
 * MongoDB database connection config
 */
export const mongodbConnection = TypeOrmModule.forRoot({
  name: database_type,
  type: database_type as OrmDatabaseType,
  database: database_name,
  host: database_host,
  username: database_username,
  password: database_password,
  entities: [],
  synchronize: true,
});

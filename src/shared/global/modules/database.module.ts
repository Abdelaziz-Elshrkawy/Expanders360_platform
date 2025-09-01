import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  // database_host,
  // database_name,
  // database_password,
  // database_type,
  // database_username,
  mongodb_uri,
  sql_database_host,
  sql_database_name,
  sql_database_password,
  sql_database_type,
  sql_database_username,
} from 'src/config/env';
import { Country } from 'src/entities/mysql/country.entity';
import { Match } from 'src/entities/mysql/match.entity';
import { Project } from 'src/entities/mysql/project.entity';
import { Service } from 'src/entities/mysql/service.entity';
import { User } from 'src/entities/mysql/users.entity';
import { Vendor } from 'src/entities/mysql/vendor.entity';
import { VendorsCountries } from 'src/entities/mysql/vendors-countries.entity';
import { VendorsServices } from 'src/entities/mysql/vendors-services.entity';
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
  entities: [
    User,
    Match,
    Country,
    Project,
    Service,
    Vendor,
    VendorsCountries,
    VendorsServices,
  ],
});

/**
 * MongoDB database connection config
 *
 */
export const mongodbConnection = MongooseModule.forRoot(mongodb_uri as string);

/**
 * not the best way to use mongodb so it's being
 * ! deprecated
 */

// TypeOrmModule.forRoot({
//   name: database_type,
//   type: database_type as OrmDatabaseType,
//   database: database_name,
//   host: database_host,
//   username: database_username,
//   password: database_password,
//   entities: [],
//   synchronize: true,
// });

import { config } from 'dotenv';

config();

/**
 * could have used @nestjs/config package but this way i always used and it more simple
 */

export const {
  port,

  // MySQL
  sql_database_type,
  sql_database_name,
  sql_database_host,
  sql_database_port,
  sql_database_username,
  sql_database_password,

  // MongoDB
  database_type,
  database_name,
  database_host,
  database_port,
  database_username,
  database_password,

  // jwt
  jwt_secret,
  jwt_expiration_period,

  //password
  password_pepper,
  salt_rounds,

  // email credentials
  email,
  email_host,
  email_password,

  // redis periods
  redis_dev_url,
  login_expire_period,
  login_attempt_limit,
} = process.env;

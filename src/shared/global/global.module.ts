import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  email,
  email_host,
  email_password,
  jwt_expiration_period,
  jwt_secret,
} from 'src/config/env';
import { MailerModule } from '@nestjs-modules/mailer';
import { CacheService } from './services/cache.service';
import { mongodbConnection, sqlConnection } from './modules/database.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { APP_GUARD } from '@nestjs/core';
import { Exceptions } from 'src/types/enums';

const emailModule = MailerModule.forRoot({
  transport: {
    host: email_host,
    auth: {
      user: email,
      pass: email_password,
    },
  },
});

const jwtModule = JwtModule.register({
  secret: jwt_secret,
  signOptions: {
    expiresIn: jwt_expiration_period,
  },
});

const throttlerModule = ThrottlerModule.forRoot({
  throttlers: [
    {
      name: 'default',
      limit: 3,
      ttl: 1000 * 10, // time in milliseconds
    },
  ],
  errorMessage: Exceptions.Too_Many_Requests,
  storage: new ThrottlerStorageRedisService(),
});

@Global()
@Module({
  imports: [
    emailModule,
    jwtModule,
    sqlConnection,
    mongodbConnection,
    throttlerModule,
  ],
  providers: [
    CacheService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [
    emailModule,
    jwtModule,
    CacheService,
    sqlConnection,
    mongodbConnection,
    throttlerModule,
  ],
})
export class GlobalModule {}

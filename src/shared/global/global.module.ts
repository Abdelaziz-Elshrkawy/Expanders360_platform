import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { sqlConnection, mongodbConnection } from './modules/database.module';
import { EmailModule } from './modules/email.module';
import { JWTModule } from './modules/jwt.module';
import { throttlerModule } from './modules/throttler.module';
import { CacheService } from './services/cache.service';

@Global()
@Module({
  imports: [
    EmailModule,
    JWTModule,
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
    EmailModule,
    JWTModule,
    CacheService,
    sqlConnection,
    mongodbConnection,
    throttlerModule,
  ],
})
export class GlobalModule {}

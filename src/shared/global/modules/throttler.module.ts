import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { Exceptions } from 'src/types/enums';

export const throttlerModule = ThrottlerModule.forRoot({
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

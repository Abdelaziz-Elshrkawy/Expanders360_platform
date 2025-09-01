import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

/**
 * Using Redis for caching in the app
 */
@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  /**
   * redis connection pooling instance for the app
   */
  client: RedisClientType;
  private readonly logger = new Logger(CacheService.name);

  async onModuleInit() {
    this.client = createClient();

    this.client.on('error', (err) => {
      this.logger.error('Failed to Connect to Redis Server');
      this.logger.error(err);
    });

    this.client.on('connect', () => this.logger.log('Redis Client connected'));

    try {
      await this.client.connect();
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(e.message);
      }
    }
  }

  async onModuleDestroy() {
    if (this.client) await this.client.quit();
  }
}

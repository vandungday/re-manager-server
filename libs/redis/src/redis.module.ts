import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'redis',
      useFactory(config: ConfigService) {
        return new Redis({
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          db: config.get('REDIS_DB'),
          connectTimeout: config.get('REDIS_CONNECT_TIMEOUT'),
        });
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}

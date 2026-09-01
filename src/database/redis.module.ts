import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const password = config.get<string>('redis.password');
        return new Redis({
          host: config.get<string>('redis.host'),
          port: config.get<number>('redis.port'),
          password: password || undefined,
          db: config.get<number>('redis.db'),
        });
      },
    },
  ],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}

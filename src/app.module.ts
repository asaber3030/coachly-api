import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { MongoDbModule } from './database/mongodb.module';
import { RedisModule } from './database/redis.module';
import { UsersModule } from './modules/users/users.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { validationSchema } from './common/schemas/env.schema';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // Global, validated config accessible everywhere via ConfigService
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      validationOptions: { abortEarly: false },
    }),

    // Basic rate limiting, applied globally below
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        throttlers: [
          {
            ttl: parseInt(process.env.THROTTLE_TTL ?? '60', 10) * 1000,
            limit: parseInt(process.env.THROTTLE_LIMIT ?? '20', 10),
          },
        ],
      }),
    }),

    DatabaseModule,
    //MongoDbModule,
    //RedisModule,

    UsersModule,
    AuthModule,
  ],
  providers: [
    // Rate limiting on every route by default
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    // Auth is required by default; use @Public() to opt individual routes out
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}

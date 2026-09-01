import { ENTITIES } from '@app/common/entities';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        entities: ENTITIES,
        url: config.get<string>('database.url'),
        autoLoadEntities: true,
        synchronize: config.get<boolean>('database.synchronize'),
        logging: config.get<boolean>('database.logging'),
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: false,
      }),
    }),
  ],
})
export class DatabaseModule {}

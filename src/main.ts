import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // keep default logger; swap for a custom logger (e.g. pino/winston) as the project grows
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const apiPrefix = configService.get<string>('apiPrefix')!;
  const corsOrigin = configService.get<string>('corsOrigin')!;
  const port = configService.get<number>('port')!;

  // Security headers
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(','),
    credentials: true,
  });

  // Global route prefix + versioning (e.g. /api/v1/users)
  app.setGlobalPrefix(apiPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global validation: strips unknown props, rejects extras, auto-transforms payloads to DTO instances
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Global error shape + response shape + request logging
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

  // Swagger / OpenAPI docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Template API')
    .setDescription('Scalable NestJS starter with auth, TypeORM and validation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // Graceful shutdown (docker/k8s SIGTERM handling)
  app.enableShutdownHooks();

  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`🚀 Application running on: http://localhost:${port}/${apiPrefix}`);
  // eslint-disable-next-line no-console
  console.log(`📚 Swagger docs available at: http://localhost:${port}/docs`);
}
bootstrap();

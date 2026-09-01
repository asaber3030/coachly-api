import helmet from 'helmet';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const apiPrefix = configService.get<string>('apiPrefix')!;
  const corsOrigin = configService.get<string>('corsOrigin')!;
  const port = configService.get<number>('port')!;

  app.use(helmet());

  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(','),
    credentials: true,
  });

  app.setGlobalPrefix(apiPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

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
    .setTitle('Coachly API')
    .setDescription('Coachly API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  // Graceful shutdown (docker/k8s SIGTERM handling)
  app.enableShutdownHooks();

  await app.listen(port);
  console.log(`🚀 Application running on: http://localhost:${port}/${apiPrefix}`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/docs`);
}
bootstrap();

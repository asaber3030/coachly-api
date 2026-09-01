"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = require("helmet");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    const configService = app.get(config_1.ConfigService);
    const apiPrefix = configService.get('apiPrefix');
    const corsOrigin = configService.get('corsOrigin');
    const port = configService.get('port');
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: corsOrigin === '*' ? true : corsOrigin.split(','),
        credentials: true,
    });
    app.setGlobalPrefix(apiPrefix);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(), new transform_interceptor_1.TransformInterceptor());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Coachly API')
        .setDescription('Coachly API documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.enableShutdownHooks();
    await app.listen(port);
    console.log(`🚀 Application running on: http://localhost:${port}/${apiPrefix}`);
    console.log(`📚 Swagger docs available at: http://localhost:${port}/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map
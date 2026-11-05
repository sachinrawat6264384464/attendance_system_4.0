import dotenv from 'dotenv';
dotenv.config({ path: '.env', override: true });
dotenv.config({ path: '../.env', override: true });
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './common/filters/http-exception.filter.js';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';
async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    const allowedOrigins = [
        process.env.FRONTEND_URL || 'http://localhost:3000',
        'https://attendancesystem40-frontend.vercel.app',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3002',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3001',
        'http://127.0.0.1:3002',
    ];
    app.enableCors({
        origin: (origin, callback) => {
            callback(null, origin || 'https://attendancesystem40-frontend.vercel.app');
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    });
    const apiPrefix = process.env.API_PREFIX || 'api/v1';
    app.setGlobalPrefix(apiPrefix);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    const config = new DocumentBuilder()
        .setTitle('Apex Academy - School Management REST API')
        .setDescription('Dedicated single-institution educational platform managing attendance, coursework, timetable, and academic records.')
        .setVersion('1.0')
        .addBearerAuth()
        .addCookieAuth('refreshToken')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
    await app.listen(port, '0.0.0.0');
    logger.log(`Server successfully started on http://localhost:${port}/${apiPrefix}`);
    logger.log(`Swagger documentation available at http://localhost:${port}/${apiPrefix}/docs`);
}
await bootstrap();
//# sourceMappingURL=main.js.map
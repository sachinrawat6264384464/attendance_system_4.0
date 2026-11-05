import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../dist/app.module.js';
import { AllExceptionsFilter } from '../dist/common/filters/http-exception.filter.js';
import { TransformInterceptor } from '../dist/common/interceptors/transform.interceptor.js';

const server = express();
let isAppInitialized = false;
let initError = null;

async function bootstrap() {
  if (!isAppInitialized) {
    try {
      server.use(cookieParser());

      // Root status handler for https://attendancesystem40-backend.vercel.app/
      server.get('/', (req, res) => {
        res.status(200).json({
          status: 'online',
          institution: 'Om Public School Dabra',
          message: 'Om Public School Academic Management REST API is live and operational',
          docs: '/api/v1/docs',
          apiPrefix: '/api/v1',
          frontend: 'https://attendancesystem40-frontend.vercel.app',
          backend: 'https://attendancesystem40-backend.vercel.app',
          timestamp: new Date().toISOString(),
        });
      });

      const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

      app.enableCors({
        origin: (origin, callback) => {
          // Allow all requests from localhost, 127.0.0.1, and all vercel.app domains
          callback(null, true);
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
      });

      const apiPrefix = process.env.API_PREFIX || 'api/v1';
      app.setGlobalPrefix(apiPrefix);

      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: false,
        }),
      );
      app.useGlobalFilters(new AllExceptionsFilter());
      app.useGlobalInterceptors(new TransformInterceptor());

      await app.init();
      isAppInitialized = true;
    } catch (err) {
      console.error('NestJS Serverless bootstrap failed:', err);
      initError = err;
    }
  }
  return server;
}

export default async function handler(req, res) {
  await bootstrap();
  if (initError && !isAppInitialized) {
    return res.status(500).json({
      status: 'error',
      message: 'Serverless initialization error',
      error: initError?.message || String(initError),
      timestamp: new Date().toISOString(),
    });
  }
  return server(req, res);
}


import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';

const server = express();
server.use(cookieParser());

let isAppInitialized = false;
let initPromise = null;
let initError = null;

// CORS setup for Express root routes - dynamically echo requesting origin so credentials: 'include' is never blocked by Chrome
server.use((req, res, next) => {
  const origin = req.headers.origin || 'https://attendancesystem40-frontend.vercel.app';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// Immediate Root Status Route: Always responds with 200 OK so you can instantly verify the backend is running!
server.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    institution: 'Om Public School Dabra',
    message: 'Om Public School Academic Management REST API is live and operational on Vercel',
    docs: '/api/v1/docs',
    apiPrefix: '/api/v1',
    frontend: 'https://attendancesystem40-frontend.vercel.app',
    backend: 'https://attendancesystem40-backend.vercel.app',
    nestInitialized: isAppInitialized,
    nestError: initError ? initError.message : null,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
server.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    nestInitialized: isAppInitialized,
    error: initError ? initError.message : null,
    timestamp: new Date().toISOString(),
  });
});

// Initialize NestJS asynchronously and dynamically so module resolution errors can be reported clearly
async function initNest() {
  if (isAppInitialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const { NestFactory } = await import('@nestjs/core');
      const { ExpressAdapter } = await import('@nestjs/platform-express');
      const { ValidationPipe } = await import('@nestjs/common');
      const { AppModule } = await import('../dist/app.module.js');
      const { AllExceptionsFilter } = await import('../dist/common/filters/http-exception.filter.js');
      const { TransformInterceptor } = await import('../dist/common/interceptors/transform.interceptor.js');

      const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

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
      console.log('NestJS successfully initialized on Vercel Serverless');
    } catch (err) {
      console.error('NestJS bootstrap error on Vercel:', err);
      initError = err;
    }
  })();

  return initPromise;
}

export default async function handler(req, res) {
  // 1. If visiting root or health, serve immediately without waiting
  if (req.url === '/' || req.url === '/health') {
    initNest().catch((err) => console.error('Background NestJS init error:', err));
    return server(req, res);
  }

  // 2. For API routes, await NestJS bootstrap
  await initNest();

  // 3. If NestJS failed, return diagnostic JSON instead of opaque Vercel 500 error
  if (initError && !isAppInitialized) {
    return res.status(500).json({
      status: 'error',
      message: 'Serverless NestJS initialization failed',
      error: initError.message,
      stack: process.env.NODE_ENV === 'development' ? initError.stack : undefined,
      timestamp: new Date().toISOString(),
    });
  }

  return server(req, res);
}

# DEPLOYMENT & PRODUCTION INFRASTRUCTURE GUIDE
## Apex Academy School Management Platform

---

## 1. Hosting Architecture
- **Backend API**: Hosted on **Render** (Web Service, Node.js environment, `0.0.0.0` binding, listening on `$PORT`).
- **Frontend App**: Hosted on **Vercel** (Next.js App Router, edge rewrites, zero secrets in client code).
- **Database**: Hosted on **Neon Serverless PostgreSQL** (US East or Asia South depending on latency preference).
- **Media CDN**: **Cloudinary** (Configured with raw/auto document support and secure upload streaming).

---

## 2. Neon PostgreSQL Configuration (Critical Rules)
1. **Mandatory SSL Mode**:
   Every database connection string must include `sslmode=require`. Non-SSL connection requests will fail immediately.
2. **Connection Pooling vs Direct Migrations**:
   - In production backend environments (`Render`), set `DATABASE_URL` to the **Pooled connection string** containing `-pooler` in the hostname (e.g. `ep-xyz-pooler.ap-southeast-1.aws.neon.tech`).
   - For database migrations via Prisma CLI, configure `DIRECT_URL` pointing to the **Direct non-pooler connection string** (e.g. `ep-xyz.ap-southeast-1.aws.neon.tech`).

---

## 3. Render Backend Deployment Checklist (Render Rules)
- **Monorepo Subdirectory**: Set `Root Directory` in Render service settings to `backend`.
- **Build Command**:
  ```bash
  npm install && npx prisma generate && npm run build
  ```
- **Start Command**:
  ```bash
  npm run start:prod
  ```
- **Host & Port Binding**:
  - The NestJS app must listen on host `0.0.0.0` and port read from `process.env.PORT` (defaults to 5000 if not provided).
- **Environment Variables**:
  Configure all variables from `.env.example` in the Render dashboard:
  - `NODE_ENV=production`
  - `DATABASE_URL` (Pooled Neon string with `sslmode=require`)
  - `DIRECT_URL` (Direct Neon string with `sslmode=require`)
  - `JWT_ACCESS_SECRET`
  - `JWT_REFRESH_SECRET`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `FRONTEND_URL=https://your-apex-school.vercel.app`

---

## 4. Vercel Frontend Deployment Checklist (Vercel Rules)
- **Root Directory**: Set `Root Directory` in Vercel project settings to `frontend`.
- **Framework Preset**: Next.js.
- **Build Command**: `next build`.
- **Environment Variables**:
  - `NEXT_PUBLIC_API_URL=https://your-apex-api.onrender.com/api/v1`
  - `NEXT_PUBLIC_APP_NAME="Apex Academy"`
  - `NEXT_PUBLIC_SCHOOL_NAME="Apex Model Senior Secondary School"`

---

## 5. Health Checks & Production Verification
- **Liveness & Readiness Endpoint**:
  `GET /api/v1/health`
  Returns:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-11-03T04:55:00Z",
    "database": "connected",
    "memoryUsage": { "rss": "85MB", "heapUsed": "48MB" }
  }
  ```


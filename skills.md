# SKILLS & ARCHITECTURAL GUIDELINES
## Developer & AI Agent Execution Capabilities

---

## 1. Core Engineering Disciplines
When implementing or modifying features in this codebase:

### 1.1 Backend Specialist (NestJS & Prisma)
- Follow NestJS dependency injection and module segregation (`Module`, `Controller`, `Service`, `DTO`).
- Validate incoming requests with `class-validator` and `ValidationPipe` (`whitelist: true`, `transform: true`).
- Protect routes with `@UseGuards(JwtAuthGuard, RolesGuard)`.
- Use Prisma parameterized queries and targeted `select` statements to eliminate over-fetching and N+1 queries.
- Adhere strictly to Neon PostgreSQL rules: mandatory `sslmode=require`, pooled connection for queries, direct connection for migrations.

### 1.2 Frontend Specialist (Next.js & Tailwind CSS)
- Maintain Server Components by default; designate `'use client'` strictly for interactive leaf components.
- Use accessible Tailwind CSS utility styling with consistent spacing, high contrast, and responsive layout.
- Use typed API response models and handle loading skeletons, empty states, and error alerts gracefully.

### 1.3 Media Storage Specialist (Cloudinary)
- Always set explicit `resource_type="auto"` or `resource_type="raw"` for documents and PDFs.
- Never store permanent uploads on local ephemeral filesystems in cloud environments (Render/Vercel).
- Never expose `CLOUDINARY_API_KEY` or `CLOUDINARY_API_SECRET` to client-side code.

### 1.4 Single-Institution Academic Domain Focus
- Maintain single-institution (Non-SaaS) simplicity: avoid adding complex tenant resolution layers or multi-tenant billing tables. Focus on deep academic fidelity (period attendance, audit trails, timetable conflict checks).


# Apex Academy - School Management & Academic Tracking Platform
### Enterprise-Grade | Secure | Modular Monolith | Dedicated Single-Institution (Non-SaaS)

---

## 🏛️ Project Overview
Apex Academy School Management Platform is a production-oriented, scalable educational management and academic tracking system. Designed specifically as a **dedicated single-institution platform (Non-SaaS)**, it provides comprehensive operational tools for schools, colleges, and academies without multi-tenant subscription overhead.

### 🌟 Core Capabilities
- **Organizational Hierarchy**: Specialized dashboards and permissions for **Principal**, **HOD**, **Coordinator**, **Teacher**, and **Student**.
- **Period-Level Attendance Engine**: Mark attendance at the individual period/session level, lock finalized sessions, enforce duplicate prevention, and route correction requests through audited approval workflows.
- **Academic Scheduling & Timetables**: Weekly bell schedules, timetable conflict checking, and teacher-subject-section allocation matrices.
- **Assignment & Submission Management**: Rich coursework assignments with Cloudinary attachments (PDFs, images), student submission tracking (`NOT_STARTED` -> `STARTED` -> `SUBMITTED` -> `REVIEWED`), and teacher grading.
- **Performance & Analytics**: Database-aggregated attendance reports, subject-wise analytics, and student progress radar.
- **Public School Website**: Modern school website featuring Home, About Us, Academics, Faculty Directory, Gallery, Contact, and Admission Enquiry.

---

## 🛠️ Technology Stack
- **Frontend**: Next.js 15+ (App Router), React, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: NestJS, Node.js, TypeScript, REST APIs, Prisma ORM, Swagger/OpenAPI
- **Database**: Neon Serverless PostgreSQL with PgBouncer connection pooling (`sslmode=require`)
- **File Storage**: Cloudinary (Direct secure streaming, raw/auto resource types)
- **Caching & Queues**: Upstash / Redis, BullMQ (optional background jobs & distributed rate limiting)

---

## 📂 Repository Structure
```
attendance_system/
├── .env                  # Local development environment configuration
├── .env.example          # Template with full configuration documentation
├── MASTER_PROMPT.md      # Master project requirements & specifications
├── ARCHITECTURE.md       # Modular monolith system architecture
├── DESIGN.md             # UI/UX design specifications & state machines
├── DATABASE_SCHEMA.md    # Complete relational database schema & ER diagram
├── API_DOCUMENTATION.md  # Detailed REST API endpoints and contracts
├── SECURITY.md           # Security policies, RBAC, IDOR protection
├── PERFORMANCE.md        # Database optimization, indexes & query strategies
├── DEPLOYMENT.md         # Deployment blueprints for Render and Vercel
├── TESTING.md            # Testing pyramid (Jest, Playwright, k6 load tests)
├── skills.md             # Engineering skill standards
├── AGENT_HANDOVER.md     # Ongoing development log & state handovers
├── backend/              # NestJS REST API application
└── frontend/             # Next.js App Router application
```

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- Node.js >= 20.x (Current environment: v24.18.0)
- npm >= 10.x
- Neon PostgreSQL database instance (or local PostgreSQL)
- Cloudinary account for media uploads

### 2. Environment Variables
Copy the template and verify database and API keys:
```bash
cp .env.example .env
```
Ensure `DATABASE_URL` includes `sslmode=require` when connecting to Neon.

### 3. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma db push # or npx prisma migrate dev
npm run start:dev
```
Backend API will start on `http://localhost:5000` with Swagger documentation at `http://localhost:5000/api/v1/docs`.

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend portal will start on `http://localhost:3000`.


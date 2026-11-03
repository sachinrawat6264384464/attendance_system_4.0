# SYSTEM ARCHITECTURE DOCUMENTATION
## School Management & Academic Tracking Platform (Apex Academy)

---

## 1. Architectural Style: Modular Monolith
The platform is designed as a **production-ready Modular Monolith**, cleanly separated into:
- **Client Tier**: Next.js (App Router, Server Components + dynamic Client Components, Tailwind CSS)
- **API Tier**: NestJS (TypeScript, dependency injection, modular domain services, guards, interceptors, pipes)
- **Persistence Tier**: Neon Serverless PostgreSQL with PgBouncer connection pooling (`sslmode=require`)
- **Asset Storage**: Cloudinary (Direct streaming backend uploads, explicit `resource_type="auto"/"raw"` for documents/PDFs)
- **Async & Caching Tier**: Upstash / Local Redis with BullMQ for heavy background jobs and distributed rate limiting.

### Architectural Diagram
```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|                                                                                   |
|  +----------------------------------+       +----------------------------------+  |
|  |     Public School Website        |       |      Role-Based Dashboards       |  |
|  |  (Home, Academics, Admissions,   |       |  - Principal      - Teacher      |  |
|  |   Faculty, Gallery, Contact)     |       |  - HOD            - Student      |  |
|  |                                  |       |  - Coordinator                   |  |
|  +----------------------------------+       +----------------------------------+  |
|                   |                                           |                   |
|                   +---------------------+---------------------+                   |
|                                         | HTTPS (JSON REST API)                   |
+-----------------------------------------v-----------------------------------------+
|                                BACKEND API (NestJS)                               |
|                                                                                   |
|  [Security & Rate Limiting Guard] -> [Auth & RBAC Guards] -> [Validation Pipes]   |
|                                                                                   |
|  +-------------------------+-------------------------+-------------------------+  |
|  | Core & Identity Modules | Academic Modules        | Activity & Assessment   |  |
|  | - Auth (Argon2id + JWT) | - Academic Years        | - Attendance Engine     |  |
|  | - User Management       | - Classes & Sections    | - Assignment Service    |  |
|  | - Institution Settings  | - Subjects & Syllabus   | - Submissions & Reviews |  |
|  | - Audit Logging         | - Timetables & Periods  | - Analytics & Reports   |  |
|  +-------------------------+-------------------------+-------------------------+  |
|              |                          |                         |               |
|              v                          v                         v               |
|    [Prisma ORM Client]          [Cloudinary Client]        [BullMQ / Redis]       |
+--------------+--------------------------+-------------------------+---------------+
               |                          |                         |
               v                          v                         v
       +---------------+          +---------------+         +---------------+
       | Neon Postgres |          | Cloudinary    |         | Redis Cache & |
       | (Pooler 5432) |          | (Secure CDN)  |         | Background    |
       | Relational DB |          | Media Storage |         | Jobs (BullMQ) |
       +---------------+          +---------------+         +---------------+
```

---

## 2. Institutional Scope: Dedicated Single-Institution Model (Non-SaaS)
Following the project owner's mandate:
- **No Multi-Tenancy Overhead**: Tables do not require complex cross-school tenant switching, billing subscriptions, or multi-tenant partition resolvers.
- **Dedicated Institutional Configuration**: Configured for one school/institution (`Apex Model Senior Secondary School`) with global institutional policies (CBSE/ICSE/State board grading, period attendance rules, school-wide academic calendars).
- **Scalability Focus**: All performance and concurrency guarantees are dedicated to scaling vertical institutional load (thousands of students, concurrent morning attendance marking sessions, bulk assignment submissions, heavy report generations).

---

## 3. Organizational Role Hierarchy & Separation of Concerns

```
                  +--------------------------------+
                  |           PRINCIPAL            |
                  | (School-wide Oversight & Audit)|
                  +---------------+----------------+
                                  |
                  +---------------v----------------+
                  |           HOD / HEAD           |
                  | (Department / Stream Oversight)|
                  +---------------+----------------+
                                  |
                  +---------------v----------------+
                  |          COORDINATOR           |
                  |  (Operational Academic Admin)  |
                  +-------+----------------+-------+
                          |                |
             +------------v---+       +----v-----------+
             |    TEACHERS    |       |    STUDENTS    |
             | (Attendance &  |       | (Personalized  |
             |  Assignments)  |       |  Portal/App)   |
             +----------------+       +----------------+
```

---

## 4. Backend Module Design (NestJS)
The backend is structured into domain modules under `backend/src/`:
1. `auth/` - Authentication, Argon2id hashing, access/refresh token rotation, guards.
2. `users/` - User profiles, roles, credentials generation, status management.
3. `school/` - Institution profile, operational timings, attendance policy settings.
4. `academic-years/` - Academic calendars, terms, active session selection.
5. `classes/` - Class levels (e.g. Grade 9, Grade 10) and Section management (A, B, C).
6. `subjects/` - Subject catalog, syllabus mapping, departmental allocation.
7. `allocations/` - Mapping teachers to specific subjects, classes, sections, and academic years.
8. `timetables/` - Scheduled periods, weekday bell schedule, session slots.
9. `attendance/` - Period-wise student attendance, finalization locks, correction requests, school-day aggregation.
10. `assignments/` - Assignment creation, Cloudinary media upload, deadline tracking.
11. `submissions/` - Student submission tracking, status transitions, grading & feedback.
12. `reports/` - High-performance PostgreSQL aggregated reports (attendance percentages, deflection alerts, assignment rates).
13. `audit/` - Immutable audit log records for administrative and attendance adjustments.
14. `cloudinary/` - Centralized file management client with signed URLs and mime-type verification.
15. `redis/` - Redis connection provider for caching and BullMQ queues.

---

## 5. Frontend Architecture (Next.js 15+ App Router)
Structured under `frontend/src/`:
- `app/(public)/`: Public website (Home, About, Academics, Faculty, Gallery, Contact, Admission Enquiry).
- `app/(auth)/`: Login, Forgot Password, Account Setup.
- `app/(dashboard)/principal/`: Executive dashboards, school analytics, approvals.
- `app/(dashboard)/hod/`: Departmental monitoring, teacher tracking.
- `app/(dashboard)/coordinator/`: Student/Teacher rosters, timetable editor, allocation matrices.
- `app/(dashboard)/teacher/`: Quick period attendance pad, assignment manager, grading console.
- `app/(dashboard)/student/`: Personal timetable, attendance radar, assignment hub, submission vault.
- `components/ui/`: Accessible, reusable UI primitives (Data tables with pagination, Modals, Forms, Badges, Charts).
- `lib/api/`: Typed HTTP client with automatic token refreshing and error normalization.


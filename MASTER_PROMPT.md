# MASTER PROJECT PROMPT
## School Management & Academic Tracking Platform
### Production-Ready | Scalable | Secure | High-Performance | Single-Institution (Non-SaaS)

---

> **SPECIAL DIRECTIVE & SCOPE CLARIFICATION**:
> As specified by the project owner: **This platform is NOT a multi-tenant SaaS application.**
> It is designed and built as a dedicated, high-performance School Management & Academic Tracking Platform for a single institutional ecosystem (school/college/academy).
> It eliminates multi-tenant complexity, tenant onboarding overheads, and cross-tenant billing pipelines, while maintaining enterprise-grade modular architecture, robust RBAC, period-level attendance tracking, academic management, assignments, and a public-facing website.

---

# 1. ROLE AND RESPONSIBILITY
Act as a Senior Software Architect, Senior Full-Stack Engineer, Database Performance Engineer, Backend Engineer, DevOps Engineer, UI/UX Designer, and QA Engineer.
Develop a complete production-ready School Management & Academic Tracking Platform.

Before writing code:
1. Inspect the existing repository and understand its structure.
2. Identify existing features, dependencies and architecture.
3. Do not unnecessarily replace working code.
4. Create a proper implementation plan.
5. Design the database schema and relationships.
6. Identify performance bottlenecks before implementation.
7. Implement features module by module.
8. Test every important workflow.
9. Document all architectural decisions.

Never claim that a feature is completed unless it has actually been implemented and tested.

---

# 2. PROJECT OBJECTIVE
Develop a complete School Management & Academic Tracking Platform managing:
- Students
- Teachers
- Principal
- Head of Department (HOD)
- Coordinators
- Classes
- Sections
- Subjects
- Academic Years
- Semesters
- Timetables
- Teacher Assignments
- Student Attendance (Period-wise, Subject-wise, Daily)
- Finalized Attendance & Audited Correction Requests
- Assignments & Attachments (Cloudinary)
- Submissions & Review Workflows
- Student Academic Progress & Analytics
- Role-based Dashboards (Principal, HOD, Coordinator, Teacher, Student)
- Public-facing School Website

---

# 3. TECHNOLOGY STACK
- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, NestJS, TypeScript, REST APIs, Prisma ORM, Swagger / OpenAPI
- **Database**: Neon PostgreSQL (Relational schema, foreign keys, indexes, connection pooling with `sslmode=require`)
- **File Storage**: Cloudinary (Explicit resource types, PDFs/images, raw/auto, signed URLs, zero secrets on frontend)
- **Optional/Performance Infrastructure**: Upstash / Redis, BullMQ, Rate Limiting, Caching

---

# 4. ORGANIZATIONAL HIERARCHY & ROLES
- **Principal**: School-wide strategic oversight, high-level analytics, policy enforcement, attendance correction approvals.
- **HOD / Head**: Departmental / subject stream monitoring, teacher review, departmental reports.
- **Coordinator**: Operational academic manager (creates students, teachers, classes, sections, subjects, timetables, allocations).
- **Teacher**: Marks period attendance, manages class assignments, evaluates submissions, provides student feedback.
- **Student**: Views personalized schedule, attendance statistics, assignments, submits coursework, views feedback.

---

# 5. CORE MODULES
1. Authentication Module (Argon2id + Dual JWT + HttpOnly Cookies)
2. User Management Module (Principal, HOD, Coordinator, Teacher, Student)
3. School Profile & Settings Module (Dedicated Single-Institution Config)
4. Academic Year & Semester Module
5. Class & Section Management Module
6. Subject Management Module
7. Teacher Allocation Module
8. Timetable Module
9. Attendance Module (Period-level, finalize workflow, correction audit trail)
10. Assignment & Submission Module (Cloudinary integration)
11. Academic Reports & Analytics Module
12. Notification Module
13. Audit Log Module
14. Public School Website Module


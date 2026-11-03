# SECURITY & DATA PRIVACY ARCHITECTURE
## Apex Academy School Management & Academic Tracking Platform

---

## 1. Threat Model & Security Posture
The platform manages sensitive student records, attendance legal records, grades, and teacher notes. Security is designed into every layer:
- **Zero Client Trust**: All authorization decisions are strictly verified on the backend via NestJS guards.
- **IDOR Protection**: All resource accesses verify that the requesting user's role and scope matches the requested resource. For example, a student cannot request another student's attendance (`/attendance/student/:id`) or another student's assignment submission (`/submissions/:id`).
- **Audit Trails**: Irreversible changes (attendance corrections, credential generation, role assignments) create immutable audit records in the database.

---

## 2. Authentication & Identity Lifecycle
- **Password Hashing**: Industry-standard **Argon2id** (`memoryCost: 65536`, `timeCost: 3`, `parallelism: 4`) with individual salt.
- **Dual-Token JWT Architecture**:
  - **Access Token**: Short-lived (15 minutes), containing minimal claims (`sub`, `email`, `roles`, `profileId`). Passed in `Authorization: Bearer <token>`.
  - **Refresh Token**: Long-lived (7 days), stored hashed in PostgreSQL with IP/User-Agent metadata. Sent in `HttpOnly`, `SameSite=Strict`, `Secure` cookies to protect against XSS token exfiltration.
  - **Token Revocation**: Refresh tokens can be explicitly revoked upon logout or administrative password resets.
- **Temporary Credential Security**: First-time coordinator-generated accounts are flagged with `must_change_password: true`, forcing immediate credential update on initial login.

---

## 3. Role-Based & Resource-Level Access Control (RBAC)
Implemented using NestJS custom decorators (`@Roles()`), `@UseGuards(JwtAuthGuard, RolesGuard)`:
- `PRINCIPAL`: Unrestricted read access across all classes, sections, teachers, and students. Exclusive approval authority for finalized attendance corrections.
- `HOD`: Read access to departments, allocated teachers, and students in departmental subjects.
- `COORDINATOR`: Operational write access for student/teacher rostering, class and timetable setups.
- `TEACHER`: Write access strictly restricted to assigned sections, subjects, and periods (`TeacherAllocation`). Cannot view or modify peer teacher private assignments.
- `STUDENT`: Read access strictly restricted to their enrolled class/section, their personalized timetable, their own attendance records, and their own submissions.

---

## 4. Media & Cloudinary Security
In strict compliance with storage best practices:
1. **Zero Secret Exposure**: `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` are never exposed to the frontend or bundled into client code.
2. **Server-Side Upload Stream**: All files are streamed through backend endpoints (`/api/v1/files/upload`) where mime-types, file sizes, and user authentication are checked before uploading to Cloudinary.
3. **Explicit Resource Type**: As required, documents, PDFs, and raw files are uploaded with explicit `resource_type="raw"` or `resource_type="auto"` to prevent Cloudinary default image transformation corruptions.
4. **Organized Namespaces**: Files are categorized into structured directories (e.g. `apex_school_system/assignments/`, `apex_school_system/submissions/`).
5. **Ownership Verification**: Download endpoints verify the student or teacher has active enrollment in the related assignment before serving signed URLs.

---

## 5. Rate Limiting & Denial of Service Protection
- **Global Throttling**: 120 requests / 60 seconds for general read APIs.
- **Sensitive Endpoint Throttling**:
  - `/api/v1/auth/login`: 5 requests / 60 seconds.
  - `/api/v1/auth/forgot-password`: 3 requests / 15 minutes.
  - `/api/v1/files/upload`: 10 requests / minute.
- Returns standard HTTP `429 Too Many Requests` with `Retry-After` headers.

---

## 6. Database Connection Security
- Neon connection string enforces `sslmode=require`. Non-SSL connections are immediately rejected.
- All SQL operations utilize Prisma ORM parameterized queries, eliminating SQL injection attack vectors.


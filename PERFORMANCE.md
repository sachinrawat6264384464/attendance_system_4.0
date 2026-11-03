# PERFORMANCE & SCALABILITY SPECIFICATION
## Apex Academy School Management & Academic Tracking Platform

---

## 1. High-Performance Relational Strategy

### 1.1 Neon PostgreSQL Connection Pooling
- **Application Runtime (NestJS)**: Always targets the Neon PgBouncer connection pooler on port `5432` / `6543` using `DATABASE_URL` with `sslmode=require&pgbouncer=true`.
  - Max pool size bounded to prevent Neon connection limit exhaustion: `DATABASE_POOL_MAX=10`.
  - One shared, singleton `PrismaClient` instance managed via NestJS `PrismaService`.
- **Database Migrations (Prisma Migrate)**: Configured using `DIRECT_URL` (direct unpooled connection) to allow schema DDL locks and transaction-level operations.

### 1.2 Zero N+1 Queries & Field Projections
- Strict rule: Never use unbounded `findMany()` without `take` and `skip`/`cursor`.
- All database queries must use Prisma `select` to retrieve only required fields:
  ```typescript
  // Example: Optimized student attendance list query
  const session = await prisma.attendanceSession.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      date: true,
      periodNumber: true,
      subject: { select: { id: true, name: true, code: true } },
      records: {
        select: {
          id: true,
          status: true,
          student: {
            select: {
              id: true,
              admissionNumber: true,
              rollNumber: true,
              user: { select: { firstName: true, lastName: true } }
            }
          }
        }
      }
    }
  });
  ```

---

## 2. In-Database Aggregations for Reports
- Calculating student attendance percentages across 200+ days and 1,500 periods must **never** be performed by loading thousands of individual record rows into Node.js memory.
- Instead, high-performance PostgreSQL `COUNT(CASE WHEN status = 'PRESENT' THEN 1 END)` queries and indexed aggregations run directly on the database engine:
  ```sql
  SELECT
    ar.student_id,
    COUNT(ar.id) AS total_periods,
    COUNT(CASE WHEN ar.status = 'PRESENT' THEN 1 END) AS attended_periods,
    ROUND(
      (COUNT(CASE WHEN ar.status = 'PRESENT' THEN 1 END)::DECIMAL / NULLIF(COUNT(ar.id), 0)) * 100,
      2
    ) AS attendance_percentage
  FROM attendance_records ar
  JOIN attendance_sessions s ON ar.session_id = s.id
  WHERE s.class_id = $1 AND s.academic_year_id = $2
  GROUP BY ar.student_id;
  ```

---

## 3. Indexing Architecture & Query Paths
1. `(class_id, section_id, academic_year_id)`: Speeds up class-level rosters and timetable lookups.
2. `(class_id, section_id, date, period_number)`: Enables instantaneous attendance duplicate checks and session retrievals.
3. `(student_id, status)`: Accelerates individual student attendance calculations.
4. `(assignment_id, student_id)`: Ensures unique submission retrieval in sub-millisecond execution time.

---

## 4. Frontend Optimization (Next.js App Router)
- **Server Components by Default**: Zero client JavaScript shipped for read-only pages (Public pages, static dashboard shells, report summaries).
- **Client Components Isolated**: Only dynamic components (Interactive attendance sheet checkboxes, assignment file drag-and-drop, date pickers) use `'use client'`.
- **Dynamic Imports**: Heavy components like charting libraries (Recharts / Chart.js) and PDF viewers are dynamically imported with loading skeletons.
- **Image Optimization**: Public campus photos and profile avatars utilize `next/image` with WebP compression and responsive srcset.


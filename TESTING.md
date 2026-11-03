# TESTING & QUALITY ASSURANCE STRATEGY
## Apex Academy School Management & Academic Tracking Platform

---

## 1. Testing Pyramid & Test Suites
The platform requires rigorous testing across three distinct layers:
1. **Unit & Service Integration Tests (Jest)**:
   - Business logic validation (Attendance percentage calculation, period eligibility rules, status state transitions).
   - DTO validation and input sanitization pipes.
   - Authentication hash verification and JWT token lifecycle.
2. **End-to-End Tests (Playwright)**:
   - Complete browser flows for every role (Principal login & audit, Coordinator rostering, Teacher attendance submission, Student assignment submission).
   - Verification of UI state updates and responsive layouts.
3. **Load & Stress Testing (k6 / Artillery)**:
   - Simulating peak morning attendance submissions across 50-1000 virtual users.
   - Measuring p50, p95, p99 latencies, database connection saturation, and 429 throttling thresholds.

---

## 2. Critical Business Scenarios Tested

### 2.1 Attendance Validation Suite
- **Duplicate Attendance Prevention**: Attempting to submit attendance for the same class, section, date, and period number twice must be rejected with HTTP 409 Conflict.
- **Unassigned Teacher Rejection**: A teacher attempting to mark attendance for a class or section not assigned in `teacher_allocations` must receive HTTP 403 Forbidden.
- **Finalized Record Lock**: Once marked `FINALIZED`, direct `PUT` or `PATCH` on `attendance_records` must be blocked; only audited correction requests are permitted.
- **Audit Preservation**: Verify that after correction approval, the original attendance status, editor user ID, approver ID, timestamp, and justification reason are preserved in `attendance_audit_logs`.

### 2.2 Access Control & IDOR Prevention
- **Cross-Student Access**: Student A attempting to call `/api/v1/attendance/student/:studentB_Id` or `/api/v1/assignments/submissions/:studentB_submissionId` receives HTTP 403 Forbidden.
- **Cross-Teacher Assignment**: Teacher A attempting to edit Teacher B's assignment receives HTTP 403 Forbidden.

---

## 3. Load Testing Benchmarks (k6 Scenarios)
Simulates concurrent traffic patterns across stages:
- **Stage 1 (50 VUs)**: Normal off-peak activity (students viewing assignments and timetables).
- **Stage 2 (100 VUs)**: Teacher morning rush (concurrent attendance marking).
- **Stage 3 (250 VUs)**: Peak concurrent load (morning attendance + student homework checks).
- **Stage 4 (500 - 1000 VUs)**: Stress test to verify connection pooling limits, rate limiting (429 handling), and Redis cache effectiveness.

Target SLA:
- p95 latency under 200ms for read requests.
- p95 latency under 350ms for attendance submissions.
- 0% uncaught database connection timeouts.


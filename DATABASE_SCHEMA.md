# DATABASE SCHEMA & RELATIONSHIP SPECIFICATION
## Neon PostgreSQL Relational Schema for School Management Platform

---

## 1. Schema Overview & Relational Principles
The database is built on **Neon PostgreSQL** with relational integrity:
- **Foreign Keys**: Enforced on every relationship with appropriate `ON DELETE RESTRICT` or `ON DELETE CASCADE`.
- **Unique Constraints**: Prevent duplicate enrollments, overlapping timetable periods, duplicate attendance marks, and duplicate submissions.
- **Data Types**: Strict typed enums, UUIDs/CUIDs for primary keys, Timestamptz for time-zone aware scheduling.
- **Indexes**: Targeted B-tree and composite indexes on query paths (e.g. `(classId, sectionId, academicYearId)`).

---

## 2. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    User ||--o{ UserRole : has
    Role ||--o{ UserRole : assigned_to
    User ||--o| StudentProfile : profile
    User ||--o| TeacherProfile : profile
    User ||--o{ RefreshToken : issues

    AcademicYear ||--o{ Semester : contains
    AcademicYear ||--o{ StudentEnrollment : tracks
    AcademicYear ||--o{ TeacherAllocation : defines
    AcademicYear ||--o{ AttendanceSession : logs

    Department ||--o{ Subject : categorizes
    Department ||--o{ TeacherProfile : assigns

    Class ||--o{ Section : divides
    Section ||--o{ StudentEnrollment : enrolls
    Section ||--o{ TeacherAllocation : teaches
    Section ||--o{ TimetableSlot : schedules

    Subject ||--o{ TeacherAllocation : maps_to
    Subject ||--o{ TimetableSlot : timetable_for
    Subject ||--o{ Assignment : contains

    TeacherProfile ||--o{ TeacherAllocation : handles
    TeacherAllocation ||--o{ TimetableSlot : period_slot

    TimetableSlot ||--o{ AttendanceSession : instances
    AttendanceSession ||--o{ AttendanceRecord : records
    StudentProfile ||--o{ AttendanceRecord : student_attends
    AttendanceRecord ||--o{ AttendanceCorrectionRequest : audited_by

    Assignment ||--o{ AssignmentAttachment : has
    Assignment ||--o{ AssignmentSubmission : receives
    StudentProfile ||--o{ AssignmentSubmission : submits
    AssignmentSubmission ||--o| AssignmentReview : graded_by
```

---

## 3. Core Table Definitions & Data Dictionaries

### 3.1 Authentication & User Management
- **`users`**:
  - `id`: UUID (PK)
  - `email`: VARCHAR(255) (UNIQUE, NOT NULL)
  - `password_hash`: VARCHAR(255) (NOT NULL, Argon2id)
  - `first_name`: VARCHAR(100) (NOT NULL)
  - `last_name`: VARCHAR(100) (NOT NULL)
  - `phone`: VARCHAR(20)
  - `avatar_url`: VARCHAR(500)
  - `is_active`: BOOLEAN (DEFAULT TRUE)
  - `must_change_password`: BOOLEAN (DEFAULT FALSE)
  - `created_at`: TIMESTAMPTZ (DEFAULT NOW())
  - `updated_at`: TIMESTAMPTZ (DEFAULT NOW())

- **`roles`**:
  - `id`: UUID (PK)
  - `name`: VARCHAR(50) (UNIQUE) -> `PRINCIPAL`, `HOD`, `COORDINATOR`, `TEACHER`, `STUDENT`
  - `description`: TEXT

- **`user_roles`**:
  - `user_id`: UUID (FK -> users.id, ON DELETE CASCADE)
  - `role_id`: UUID (FK -> roles.id, ON DELETE RESTRICT)
  - PRIMARY KEY (`user_id`, `role_id`)

- **`refresh_tokens`**:
  - `id`: UUID (PK)
  - `user_id`: UUID (FK -> users.id, ON DELETE CASCADE)
  - `token_hash`: VARCHAR(255) (UNIQUE, NOT NULL)
  - `expires_at`: TIMESTAMPTZ (NOT NULL)
  - `revoked_at`: TIMESTAMPTZ (NULLABLE)
  - `created_at`: TIMESTAMPTZ (DEFAULT NOW())

---

### 3.2 Academic Structure & Hierarchy
- **`academic_years`**:
  - `id`: UUID (PK)
  - `name`: VARCHAR(100) (e.g., "2026-2027") (UNIQUE)
  - `start_date`: DATE (NOT NULL)
  - `end_date`: DATE (NOT NULL)
  - `is_current`: BOOLEAN (DEFAULT FALSE)
  - `created_at`: TIMESTAMPTZ

- **`departments`**:
  - `id`: UUID (PK)
  - `name`: VARCHAR(100) (UNIQUE) (e.g. "Science", "Commerce", "Humanities")
  - `code`: VARCHAR(20) (UNIQUE)
  - `hod_id`: UUID (FK -> users.id, NULLABLE)

- **`classes`**:
  - `id`: UUID (PK)
  - `name`: VARCHAR(50) (e.g. "Grade 10", "Class 12")
  - `numeric_order`: INT (NOT NULL, for sequence sorting)

- **`sections`**:
  - `id`: UUID (PK)
  - `class_id`: UUID (FK -> classes.id, ON DELETE CASCADE)
  - `name`: VARCHAR(20) (e.g. "A", "B", "Rose")
  - `room_number`: VARCHAR(50)
  - UNIQUE (`class_id`, `name`)

- **`subjects`**:
  - `id`: UUID (PK)
  - `name`: VARCHAR(100) (e.g. "Mathematics", "Physics")
  - `code`: VARCHAR(20) (UNIQUE)
  - `department_id`: UUID (FK -> departments.id, NULLABLE)
  - `is_elective`: BOOLEAN (DEFAULT FALSE)

---

### 3.3 Profiles & Enrollments
- **`teacher_profiles`**:
  - `id`: UUID (PK)
  - `user_id`: UUID (UNIQUE, FK -> users.id, ON DELETE CASCADE)
  - `employee_id`: VARCHAR(50) (UNIQUE, NOT NULL)
  - `qualification`: VARCHAR(200)
  - `specialization`: VARCHAR(200)
  - `department_id`: UUID (FK -> departments.id, NULLABLE)
  - `joining_date`: DATE

- **`student_profiles`**:
  - `id`: UUID (PK)
  - `user_id`: UUID (UNIQUE, FK -> users.id, ON DELETE CASCADE)
  - `admission_number`: VARCHAR(50) (UNIQUE, NOT NULL)
  - `roll_number`: VARCHAR(50)
  - `date_of_birth`: DATE
  - `gender`: VARCHAR(20)
  - `guardian_name`: VARCHAR(150)
  - `guardian_phone`: VARCHAR(20)
  - `blood_group`: VARCHAR(10)

- **`student_enrollments`**:
  - `id`: UUID (PK)
  - `student_id`: UUID (FK -> student_profiles.id, ON DELETE CASCADE)
  - `academic_year_id`: UUID (FK -> academic_years.id, ON DELETE RESTRICT)
  - `class_id`: UUID (FK -> classes.id, ON DELETE RESTRICT)
  - `section_id`: UUID (FK -> sections.id, ON DELETE RESTRICT)
  - `roll_number`: VARCHAR(50)
  - `is_active`: BOOLEAN (DEFAULT TRUE)
  - UNIQUE (`student_id`, `academic_year_id`)

---

### 3.4 Allocations, Timetable & Scheduling
- **`teacher_allocations`**:
  - `id`: UUID (PK)
  - `academic_year_id`: UUID (FK -> academic_years.id, ON DELETE RESTRICT)
  - `teacher_id`: UUID (FK -> teacher_profiles.id, ON DELETE RESTRICT)
  - `subject_id`: UUID (FK -> subjects.id, ON DELETE RESTRICT)
  - `class_id`: UUID (FK -> classes.id, ON DELETE RESTRICT)
  - `section_id`: UUID (FK -> sections.id, ON DELETE RESTRICT)
  - UNIQUE (`academic_year_id`, `teacher_id`, `subject_id`, `class_id`, `section_id`)

- **`timetable_slots`**:
  - `id`: UUID (PK)
  - `academic_year_id`: UUID (FK -> academic_years.id)
  - `class_id`: UUID (FK -> classes.id)
  - `section_id`: UUID (FK -> sections.id)
  - `subject_id`: UUID (FK -> subjects.id)
  - `teacher_id`: UUID (FK -> teacher_profiles.id)
  - `day_of_week`: INT (1 = Monday, 6 = Saturday)
  - `period_number`: INT (1 to 8)
  - `start_time`: TIME (e.g. 08:30)
  - `end_time`: TIME (e.g. 09:15)
  - UNIQUE (`academic_year_id`, `class_id`, `section_id`, `day_of_week`, `period_number`)
  - UNIQUE (`academic_year_id`, `teacher_id`, `day_of_week`, `period_number`)

---

### 3.5 Period-Wise Attendance & Audit System
- **`attendance_sessions`**:
  - `id`: UUID (PK)
  - `academic_year_id`: UUID (FK -> academic_years.id)
  - `class_id`: UUID (FK -> classes.id)
  - `section_id`: UUID (FK -> sections.id)
  - `subject_id`: UUID (FK -> subjects.id)
  - `teacher_id`: UUID (FK -> teacher_profiles.id)
  - `date`: DATE (NOT NULL)
  - `period_number`: INT (NOT NULL)
  - `status`: ENUM (`IN_PROGRESS`, `FINALIZED`, `CANCELLED`) (DEFAULT `FINALIZED`)
  - `is_finalized`: BOOLEAN (DEFAULT TRUE)
  - `finalized_at`: TIMESTAMPTZ
  - `remarks`: TEXT
  - UNIQUE (`academic_year_id`, `class_id`, `section_id`, `date`, `period_number`)

- **`attendance_records`**:
  - `id`: UUID (PK)
  - `session_id`: UUID (FK -> attendance_sessions.id, ON DELETE CASCADE)
  - `student_id`: UUID (FK -> student_profiles.id, ON DELETE RESTRICT)
  - `status`: ENUM (`PRESENT`, `ABSENT`, `LATE`, `EXCUSED`)
  - `remarks`: VARCHAR(255)
  - UNIQUE (`session_id`, `student_id`)

- **`attendance_correction_requests`**:
  - `id`: UUID (PK)
  - `attendance_record_id`: UUID (FK -> attendance_records.id)
  - `requested_by_id`: UUID (FK -> users.id)
  - `old_status`: ENUM (`PRESENT`, `ABSENT`, `LATE`, `EXCUSED`)
  - `new_status`: ENUM (`PRESENT`, `ABSENT`, `LATE`, `EXCUSED`)
  - `reason`: TEXT (NOT NULL)
  - `approval_status`: ENUM (`PENDING`, `APPROVED`, `REJECTED`) (DEFAULT `PENDING`)
  - `reviewed_by_id`: UUID (FK -> users.id, NULLABLE)
  - `reviewed_at`: TIMESTAMPTZ (NULLABLE)
  - `review_notes`: TEXT

---

### 3.6 Assignments, Submissions & Cloudinary Attachments
- **`assignments`**:
  - `id`: UUID (PK)
  - `title`: VARCHAR(255) (NOT NULL)
  - `description`: TEXT (NOT NULL)
  - `instructions`: TEXT
  - `subject_id`: UUID (FK -> subjects.id)
  - `class_id`: UUID (FK -> classes.id)
  - `section_id`: UUID (FK -> sections.id)
  - `teacher_id`: UUID (FK -> teacher_profiles.id)
  - `academic_year_id`: UUID (FK -> academic_years.id)
  - `due_date`: TIMESTAMPTZ (NOT NULL)
  - `max_marks`: DECIMAL(5,2) (DEFAULT 100.00)
  - `is_submission_enabled`: BOOLEAN (DEFAULT TRUE)
  - `created_at`: TIMESTAMPTZ (DEFAULT NOW())

- **`assignment_attachments`**:
  - `id`: UUID (PK)
  - `assignment_id`: UUID (FK -> assignments.id, ON DELETE CASCADE)
  - `file_url`: VARCHAR(1000) (Cloudinary secure_url)
  - `public_id`: VARCHAR(255) (Cloudinary public_id)
  - `file_name`: VARCHAR(255)
  - `file_size`: INT
  - `mime_type`: VARCHAR(100)
  - `resource_type`: VARCHAR(50) (e.g. 'raw', 'auto', 'image')

- **`assignment_submissions`**:
  - `id`: UUID (PK)
  - `assignment_id`: UUID (FK -> assignments.id, ON DELETE CASCADE)
  - `student_id`: UUID (FK -> student_profiles.id, ON DELETE RESTRICT)
  - `status`: ENUM (`NOT_STARTED`, `STARTED`, `SUBMITTED`, `REVIEWED`) (DEFAULT `NOT_STARTED`)
  - `submission_text`: TEXT
  - `file_url`: VARCHAR(1000) (Cloudinary secure_url)
  - `file_public_id`: VARCHAR(255)
  - `submitted_at`: TIMESTAMPTZ
  - `is_late`: BOOLEAN (DEFAULT FALSE)
  - UNIQUE (`assignment_id`, `student_id`)

- **`assignment_reviews`**:
  - `id`: UUID (PK)
  - `submission_id`: UUID (UNIQUE, FK -> assignment_submissions.id, ON DELETE CASCADE)
  - `teacher_id`: UUID (FK -> teacher_profiles.id)
  - `marks_obtained`: DECIMAL(5,2)
  - `feedback`: TEXT
  - `reviewed_at`: TIMESTAMPTZ (DEFAULT NOW())

---

### 3.7 Public Website & Administration
- **`admission_enquiries`**:
  - `id`: UUID (PK)
  - `student_name`: VARCHAR(150) (NOT NULL)
  - `guardian_name`: VARCHAR(150) (NOT NULL)
  - `email`: VARCHAR(255) (NOT NULL)
  - `phone`: VARCHAR(20) (NOT NULL)
  - `applying_for_grade`: VARCHAR(50) (NOT NULL)
  - `message`: TEXT
  - `status`: ENUM (`NEW`, `CONTACTED`, `SCHEDULED`, `ENROLLED`, `REJECTED`)
  - `created_at`: TIMESTAMPTZ (DEFAULT NOW())

- **`audit_logs`**:
  - `id`: UUID (PK)
  - `user_id`: UUID (FK -> users.id, NULLABLE)
  - `action`: VARCHAR(100) (e.g. `ATTENDANCE_CORRECTED`, `USER_CREATED`)
  - `resource_type`: VARCHAR(100)
  - `resource_id`: VARCHAR(100)
  - `ip_address`: VARCHAR(50)
  - `user_agent`: VARCHAR(255)
  - `payload`: JSONB
  - `created_at`: TIMESTAMPTZ (DEFAULT NOW())

---

## 4. Performance Indexing Strategy
```sql
-- Fast query indexes
CREATE INDEX idx_student_enrollments_lookup ON student_enrollments (class_id, section_id, academic_year_id);
CREATE INDEX idx_attendance_sessions_lookup ON attendance_sessions (class_id, section_id, date, academic_year_id);
CREATE INDEX idx_attendance_records_student ON attendance_records (student_id, status);
CREATE INDEX idx_timetable_slots_schedule ON timetable_slots (academic_year_id, class_id, section_id, day_of_week);
CREATE INDEX idx_assignments_filter ON assignments (class_id, section_id, subject_id, due_date);
CREATE INDEX idx_submissions_status ON assignment_submissions (assignment_id, status);
```


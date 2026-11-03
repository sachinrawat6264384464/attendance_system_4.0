# API SPECIFICATION & DOCUMENTATION
## Apex Academy School Management REST APIs (`/api/v1`)

---

## 1. Overview & Standards
- **Base URL**: `http://localhost:5000/api/v1` (Production: `https://api.yourdomain.com/api/v1`)
- **Swagger Documentation**: Available at `/api/v1/docs` in development mode.
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <access_token>`
- **Response Format**:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Resource retrieved successfully",
    "data": { ... },
    "meta": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 140,
      "totalPages": 7
    }
  }
  ```
- **Error Response Format**:
  ```json
  {
    "success": false,
    "statusCode": 400,
    "error": "Bad Request",
    "message": ["email must be an email address"],
    "timestamp": "2026-11-03T04:55:00Z",
    "path": "/api/v1/auth/login"
  }
  ```

---

## 2. Core Endpoint Matrix

### 2.1 Authentication & Profile (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/auth/login` | Public | Authenticate with email/password; returns access token & sets HTTP-only refresh cookie |
| `POST` | `/auth/refresh` | Public (Cookie) | Rotates refresh token & issues new access token |
| `POST` | `/auth/logout` | Authenticated | Revokes current refresh token and clears cookie |
| `GET` | `/auth/me` | Authenticated | Returns logged in user profile, roles, and permissions |
| `PUT` | `/auth/change-password` | Authenticated | Updates password and marks `must_change_password=false` |

---

### 2.2 Academic Setup & Roster (`/api/v1/academics`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/academic-years` | Authenticated | List all academic years (with active year indicator) |
| `POST` | `/academic-years` | Coordinator, Principal | Create a new academic calendar |
| `GET` | `/classes` | Authenticated | List classes with their associated sections |
| `POST` | `/classes` | Coordinator | Create class level |
| `POST` | `/sections` | Coordinator | Create section for a class |
| `GET` | `/subjects` | Authenticated | List subjects by department/class |
| `POST` | `/subjects` | Coordinator | Add subject with code and syllabus link |

---

### 2.3 User & Profile Management (`/api/v1/users`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/users/teachers` | Coordinator, Principal, HOD | List teachers with department and allocations |
| `POST` | `/users/teachers` | Coordinator | Create teacher account & profile with employee ID |
| `GET` | `/users/students` | Coordinator, Principal, HOD, Teacher | Paginated student roster with class/section filter |
| `POST` | `/users/students` | Coordinator | Create student profile with admission number |
| `POST` | `/users/students/bulk` | Coordinator | Bulk import students via CSV payload |

---

### 2.4 Timetable & Allocations (`/api/v1/timetable`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/timetable/class/:classId/section/:sectionId` | Authenticated | View complete weekly bell schedule for section |
| `GET` | `/timetable/teacher/my-schedule` | Teacher | View logged-in teacher's weekly scheduled periods |
| `GET` | `/timetable/student/my-schedule` | Student | View logged-in student's daily timetable |
| `POST` | `/timetable/slots` | Coordinator | Configure a timetable period slot with conflict checking |
| `POST` | `/allocations` | Coordinator | Map teacher to subject, class, section, and academic year |

---

### 2.5 Attendance Engine (`/api/v1/attendance`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/attendance/sessions` | Teacher, Coordinator, Principal | List scheduled sessions for today or a specific date |
| `POST` | `/attendance/submit` | Teacher | Submit finalized period attendance for enrolled students |
| `GET` | `/attendance/session/:id` | Teacher, Coordinator, Principal | Get student status records for a period session |
| `POST` | `/attendance/corrections` | Teacher | Submit attendance correction request with reason |
| `GET` | `/attendance/corrections/pending` | Principal, Coordinator | List pending attendance correction requests |
| `PATCH` | `/attendance/corrections/:id/review`| Principal | Approve or reject correction (generates audit trail) |
| `GET` | `/attendance/student/my-attendance` | Student | Personal overall, subject-wise, and period-wise attendance |
| `GET` | `/attendance/reports/class` | Principal, HOD, Coordinator | Aggregated attendance report for a class & date range |

---

### 2.6 Assignments & Submissions (`/api/v1/assignments`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/assignments` | Authenticated | List assignments scoped to user's class or teaching load |
| `POST` | `/assignments` | Teacher | Create assignment with title, due date, and Cloudinary attachments |
| `GET` | `/assignments/:id` | Authenticated | Assignment details, instructions, and attachments |
| `PATCH` | `/assignments/:id/start` | Student | Mark assignment status as `STARTED` |
| `POST` | `/assignments/:id/submit`| Student | Submit work with text notes or Cloudinary file attachment |
| `GET` | `/assignments/:id/submissions` | Teacher | View all student submissions for this assignment |
| `POST` | `/assignments/submissions/:id/review` | Teacher | Grade submission with marks and written feedback |

---

### 2.7 Files & Media (`/api/v1/files`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/files/upload` | Authenticated | Stream file to Cloudinary with explicit `resource_type="auto"` / `"raw"` |
| `GET` | `/files/signed-url` | Authenticated | Generate signed access URL for private assignment document |

---

### 2.8 Public School Endpoints (`/api/v1/public`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/public/school-info` | Public | School identity, contact numbers, address, affiliation |
| `GET` | `/public/faculty-directory`| Public | Public listing of faculty and academic departments |
| `POST` | `/public/admission-enquiry`| Public | Submit new student admission enquiry form |


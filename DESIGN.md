# SYSTEM DESIGN & UI/UX SPECIFICATION
## Apex Academy School Management & Academic Tracking Platform

---

## 1. Design System & Visual Language
The design system follows a modern, clean, enterprise educational identity:
- **Primary Palette**: Deep Navy / Indigo (`#1e293b`, `#0f172a`, `#3b82f6`, `#2563eb`) representing academic excellence and trust.
- **Accent Palette**: Emerald Green (`#10b981`) for present/on-track states, Amber (`#f59e0b`) for pending/late states, Rose/Red (`#ef4444`) for absent/attention required.
- **Neutral Palette**: Clean slate tones (`#f8fafc`, `#f1f5f9`, `#e2e8f0`, `#64748b`) with high contrast text (`#0f172a`).
- **Typography**: Inter / Outfit for modern, highly readable dashboard typography.
- **Component Primitives**: Tailwind CSS with consistent spacing (`4px` grid), card elevations (`shadow-sm`, `border border-slate-200`), rounded borders (`rounded-xl`), and accessible focus rings.

---

## 2. Information Architecture & Navigation

### 2.1 Public School Portal
- **Header**: Institutional Branding, Quick Contact, Navigation Links (Academics, Faculty, Admissions, Gallery), Portal Login Button.
- **Hero Section**: Campus imagery, Mission statement, Key statistics (99.4% Board Passing Rate, 1:15 Faculty Ratio, Modern Labs), CTA to Apply.
- **Academics Section**: Curriculum overview (CBSE/State Board), Departments, STEM initiatives.
- **Admissions Page**: Interactive Admission Enquiry form with validation, fee schedule, eligibility criteria.
- **Faculty Directory**: Filterable list of department heads and teachers with credentials.
- **Contact & Location**: Interactive Google Maps frame, contact details, office timings.

### 2.2 Role-Based Dashboards
Every authenticated user enters a specialized dashboard based on their role:
- **Principal Dashboard**:
  - High-level KPIs: School-wide attendance rate today, total enrolled students, faculty presence, active assignments.
  - Deflection Alerts: Classes/Sections with attendance drop below 80%.
  - Pending Approvals: Attendance correction requests submitted by teachers.
  - Academic overview: Assignment completion across grades.
- **HOD Dashboard**:
  - Departmental roster: Faculty count, subject-wise curriculum coverage.
  - Teacher activity monitor: Timetable adherence and assignment submission metrics.
  - Department attendance radar: Subject-wise student attendance trends.
- **Coordinator Dashboard**:
  - Operational control: Quick actions for enrolling students, assigning teachers, generating timetable grids.
  - Attendance compliance: Verification of periods marked vs scheduled periods today.
  - Roster management: Class-wise student lists with search, filter, and CSV export.
- **Teacher Dashboard**:
  - "Today's Schedule": Current and upcoming periods with one-click "Mark Attendance" triggers.
  - Active Assignments: Live cards with submission counters (e.g. 24/30 submitted).
  - Quick Evaluation Tray: Submissions pending review and grading.
- **Student Dashboard**:
  - Today's Timetable: Active period countdown, subject, teacher name, classroom.
  - Personal Attendance Metric: Radial percentage bar with color-coded safety thresholds (>75% Green, 65-75% Amber, <65% Red).
  - Subject-wise & Period-wise breakdown: Expandable drill-down.
  - Assignment Hub: Filter by "Pending", "Started", "Submitted", "Graded" with upload action and teacher feedback.

---

## 3. Core Workflow State Machines

### 3.1 Attendance State Machine
```
[Unmarked Scheduled Period]
       │
       ▼ (Teacher opens period session)
[In Progress]
       │
       ▼ (Teacher marks Present/Absent/Late and clicks Submit)
[Finalized Record] ─── (Direct edit locked)
       │
       ▼ (Teacher detects error & submits request)
[Correction Requested (Pending)]
       │
   ┌───┴────────────────────────┐
   ▼ (Approved by Principal)    ▼ (Rejected)
[Correction Applied]          [Original Record Retained]
(Audit Log generated,         (Teacher notified)
 old/new values preserved)
```

### 3.2 Assignment & Submission State Machine
```
[Teacher Creates Assignment] (Files uploaded to Cloudinary)
       │
       ▼ (Published to Class & Section)
[Assignment Active]
       │
       ├─────────────────────────────────┐
       ▼ (Student marks Started)         │
[Started]                                │
       │                                 │
       ▼ (Student attaches file/text)    ▼ (Student submits directly)
[Submitted] ─────────────────────────────┘
       │
       ▼ (Teacher opens grading console)
[Reviewed / Graded]
(Feedback and marks published to student dashboard)
```


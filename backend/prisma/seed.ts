import { PrismaClient, RoleType, AttendanceStatus, SessionStatus } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Apex Academy Database Seeding (Non-SaaS Dedicated Institution)...');

  // 1. Create Roles
  const roles = [
    { name: RoleType.PRINCIPAL, description: 'Executive School Leadership' },
    { name: RoleType.HOD, description: 'Head of Department' },
    { name: RoleType.COORDINATOR, description: 'Academic Operations Manager' },
    { name: RoleType.TEACHER, description: 'Teaching Faculty' },
    { name: RoleType.STUDENT, description: 'Enrolled Student' },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
  }
  console.log('✅ Roles seeded.');

  // 2. Seed School Settings
  await prisma.schoolSetting.upsert({
    where: { id: 'default-school-setting' },
    update: {},
    create: {
      id: 'default-school-setting',
      schoolName: 'Apex Model Senior Secondary School',
      schoolCode: 'APEX-SCH-01',
      affiliationNo: 'CBSE-AFF-2024-987',
      email: 'admin@apexschool.edu',
      phone: '+91 98765 43210',
      address: 'Knowledge City, Sector 4, Educational Hub',
      timezone: 'Asia/Kolkata',
      currency: 'INR',
      minPeriodsPresent: 3,
      correctionWindowDays: 7,
    },
  });
  console.log('✅ School Settings seeded.');

  // 3. Seed Academic Year
  const currentYear = await prisma.academicYear.upsert({
    where: { name: '2026-2027' },
    update: { isCurrent: true },
    create: {
      name: '2026-2027',
      startDate: new Date('2026-04-01'),
      endDate: new Date('2027-03-31'),
      isCurrent: true,
      semesters: {
        create: [
          { name: 'Term 1', startDate: new Date('2026-04-01'), endDate: new Date('2026-09-30'), isCurrent: true },
          { name: 'Term 2', startDate: new Date('2026-10-01'), endDate: new Date('2027-03-31'), isCurrent: false },
        ],
      },
    },
  });
  console.log('✅ Academic Year & Terms seeded.');

  // 4. Seed Classes & Sections
  const grade10 = await prisma.class.upsert({
    where: { name: 'Grade 10' },
    update: {},
    create: {
      name: 'Grade 10',
      numericOrder: 10,
      sections: {
        create: [
          { name: 'A', roomNumber: 'Room 101' },
          { name: 'B', roomNumber: 'Room 102' },
        ],
      },
    },
    include: { sections: true },
  });

  const section10A = grade10.sections.find((s) => s.name === 'A')!;

  // 5. Seed Department & Subjects
  const scienceDept = await prisma.department.upsert({
    where: { code: 'SCI' },
    update: {},
    create: {
      name: 'Science & Mathematics',
      code: 'SCI',
    },
  });

  const mathSubject = await prisma.subject.upsert({
    where: { code: 'MATH-10' },
    update: {},
    create: {
      name: 'Mathematics',
      code: 'MATH-10',
      departmentId: scienceDept.id,
    },
  });

  const physicsSubject = await prisma.subject.upsert({
    where: { code: 'PHY-10' },
    update: {},
    create: {
      name: 'Physics',
      code: 'PHY-10',
      departmentId: scienceDept.id,
    },
  });
  console.log('✅ Classes, Sections, Departments & Subjects seeded.');

  // 6. Seed Key Users with Argon2
  const principalRole = await prisma.role.findUnique({ where: { name: RoleType.PRINCIPAL } });
  const coordinatorRole = await prisma.role.findUnique({ where: { name: RoleType.COORDINATOR } });
  const teacherRole = await prisma.role.findUnique({ where: { name: RoleType.TEACHER } });
  const studentRole = await prisma.role.findUnique({ where: { name: RoleType.STUDENT } });

  // Principal
  const principalPassword = await argon2.hash('Principal@123');
  await prisma.user.upsert({
    where: { email: 'principal@apexschool.edu' },
    update: {},
    create: {
      email: 'principal@apexschool.edu',
      passwordHash: principalPassword,
      firstName: 'Dr. Vikram',
      lastName: 'Malhotra',
      phone: '+91 98111 00001',
      roles: { create: { roleId: principalRole!.id } },
    },
  });

  // Coordinator
  const coordPassword = await argon2.hash('Coordinator@123');
  await prisma.user.upsert({
    where: { email: 'coordinator@apexschool.edu' },
    update: {},
    create: {
      email: 'coordinator@apexschool.edu',
      passwordHash: coordPassword,
      firstName: 'Sunita',
      lastName: 'Nambiar',
      phone: '+91 98111 00002',
      roles: { create: { roleId: coordinatorRole!.id } },
    },
  });

  // Teacher (Mathematics)
  const teacherPassword = await argon2.hash('Teacher@123');
  const mathTeacherUser = await prisma.user.upsert({
    where: { email: 'teacher.math@apexschool.edu' },
    update: {},
    create: {
      email: 'teacher.math@apexschool.edu',
      passwordHash: teacherPassword,
      firstName: 'Rajesh',
      lastName: 'Sharma',
      phone: '+91 98111 00003',
      roles: { create: { roleId: teacherRole!.id } },
      teacherProfile: {
        create: {
          employeeId: 'EMP-MATH-01',
          qualification: 'M.Sc. Mathematics, B.Ed.',
          specialization: 'Algebra & Geometry',
          departmentId: scienceDept.id,
        },
      },
    },
    include: { teacherProfile: true },
  });

  // Student 1 (Aarav Kumar)
  const studentPassword = await argon2.hash('Student@123');
  const aaravUser = await prisma.user.upsert({
    where: { email: 'student.aarav@apexschool.edu' },
    update: {},
    create: {
      email: 'student.aarav@apexschool.edu',
      passwordHash: studentPassword,
      firstName: 'Aarav',
      lastName: 'Kumar',
      phone: '+91 98111 00010',
      roles: { create: { roleId: studentRole!.id } },
      studentProfile: {
        create: {
          admissionNumber: 'ADM-2026-001',
          rollNumber: '01',
          dateOfBirth: new Date('2010-06-12'),
          gender: 'Male',
          guardianName: 'Ramesh Kumar',
          guardianPhone: '+91 98111 00011',
        },
      },
    },
    include: { studentProfile: true },
  });

  // Enroll Student in 10-A
  await prisma.studentEnrollment.upsert({
    where: {
      studentId_academicYearId: {
        studentId: aaravUser.studentProfile!.id,
        academicYearId: currentYear.id,
      },
    },
    update: {},
    create: {
      studentId: aaravUser.studentProfile!.id,
      academicYearId: currentYear.id,
      classId: grade10.id,
      sectionId: section10A.id,
      rollNumber: '01',
    },
  });

  // 7. Teacher Allocation: Math Teacher -> Grade 10-A -> Mathematics
  await prisma.teacherAllocation.upsert({
    where: {
      academicYearId_teacherId_subjectId_classId_sectionId: {
        academicYearId: currentYear.id,
        teacherId: mathTeacherUser.teacherProfile!.id,
        subjectId: mathSubject.id,
        classId: grade10.id,
        sectionId: section10A.id,
      },
    },
    update: {},
    create: {
      academicYearId: currentYear.id,
      teacherId: mathTeacherUser.teacherProfile!.id,
      subjectId: mathSubject.id,
      classId: grade10.id,
      sectionId: section10A.id,
    },
  });

  // 8. Timetable Slot: Monday Period 1 (08:30 - 09:15)
  await prisma.timetableSlot.upsert({
    where: {
      academicYearId_classId_sectionId_dayOfWeek_periodNumber: {
        academicYearId: currentYear.id,
        classId: grade10.id,
        sectionId: section10A.id,
        dayOfWeek: 1, // Monday
        periodNumber: 1,
      },
    },
    update: {},
    create: {
      academicYearId: currentYear.id,
      classId: grade10.id,
      sectionId: section10A.id,
      subjectId: mathSubject.id,
      teacherId: mathTeacherUser.teacherProfile!.id,
      dayOfWeek: 1,
      periodNumber: 1,
      startTime: '08:30',
      endTime: '09:15',
    },
  });
  console.log('✅ Demo Allocations & Timetable Slots seeded.');

  console.log('\n🎉 Seed completed successfully!');
  console.log('----------------------------------------------------');
  console.log('Principal:   principal@apexschool.edu   / Principal@123');
  console.log('Coordinator: coordinator@apexschool.edu / Coordinator@123');
  console.log('Teacher:     teacher.math@apexschool.edu / Teacher@123');
  console.log('Student:     student.aarav@apexschool.edu / Student@123');
  console.log('----------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


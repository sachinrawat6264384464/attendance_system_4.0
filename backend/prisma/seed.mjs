import dotenv from 'dotenv';
dotenv.config({ path: '.env', override: true });
dotenv.config({ path: '../.env', override: true });
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL }
  }
});

async function main() {
  console.log('🌱 Starting Dandelion Kidz Database Seeding...');

  // 1. Create Roles
  const roles = [
    { name: 'PRINCIPAL', description: 'Executive School Leadership' },
    { name: 'HOD', description: 'Head of Department' },
    { name: 'COORDINATOR', description: 'Academic Operations Manager' },
    { name: 'TEACHER', description: 'Teaching Faculty' },
    { name: 'STUDENT', description: 'Enrolled Student' },
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
      schoolName: 'Dandelion Kidz Pre School',
      schoolCode: 'DANDELION-01',
      affiliationNo: 'ECCE-MONTESSORI-2026',
      email: 'info@dandelionkidz.in',
      phone: '+91 7417470570',
      address: 'Rajhans Society 3, Opp. Aradhana Tea, Raiya Road, Rajkot - 360007, Gujarat',
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

  // 4. Seed Preschool Classes & Sections
  const classesToSeed = [
    { name: 'Todd Care', order: 1, age: '1 to 2 years' },
    { name: 'Playhouse', order: 2, age: '2 to 3 years' },
    { name: 'Nursery', order: 3, age: '3 to 4 years' },
    { name: 'Jr. Kg', order: 4, age: '4 to 5 years' },
    { name: 'Sr. Kg', order: 5, age: '5 to 6 years' },
    { name: 'Day Care', order: 6, age: '1 to 10 years' },
  ];

  const seededClasses = [];
  for (const cls of classesToSeed) {
    const c = await prisma.class.upsert({
      where: { name: cls.name },
      update: {},
      create: {
        name: cls.name,
        numericOrder: cls.order,
        sections: {
          create: [
            { name: 'A', roomNumber: `Room 10${cls.order}` },
            { name: 'B', roomNumber: `Room 20${cls.order}` },
          ],
        },
      },
      include: { sections: true },
    });
    seededClasses.push(c);
  }
  console.log('✅ Dandelion Kidz Classes & Sections seeded.');

  // 5. Seed Department & Subjects
  const ecceDept = await prisma.department.upsert({
    where: { code: 'ECCE' },
    update: {},
    create: {
      name: 'Early Childhood Care & Education',
      code: 'ECCE',
    },
  });

  const subjectsToSeed = [
    { name: 'Sensory & Nature Play', code: 'SENSORY-01' },
    { name: 'Early Literacy & Phonics', code: 'LIT-01' },
    { name: 'Numeracy & Shapes', code: 'NUM-01' },
    { name: 'Creative Arts & Puppetry', code: 'ART-01' },
    { name: 'Gross Motor & Agility', code: 'MOTOR-01' },
  ];

  const seededSubjects = [];
  for (const s of subjectsToSeed) {
    const sub = await prisma.subject.upsert({
      where: { code: s.code },
      update: {},
      create: {
        name: s.name,
        code: s.code,
        departmentId: ecceDept.id,
      },
    });
    seededSubjects.push(sub);
  }
  console.log('✅ ECCE Department & Subjects seeded.');

  // 6. Seed Key Users with Argon2
  const principalRole = await prisma.role.findUnique({ where: { name: 'PRINCIPAL' } });
  const coordinatorRole = await prisma.role.findUnique({ where: { name: 'COORDINATOR' } });
  const teacherRole = await prisma.role.findUnique({ where: { name: 'TEACHER' } });
  const studentRole = await prisma.role.findUnique({ where: { name: 'STUDENT' } });

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
      roles: { create: { roleId: principalRole.id } },
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
      roles: { create: { roleId: coordinatorRole.id } },
    },
  });

  // Teacher (ECCE Specialist)
  const teacherPassword = await argon2.hash('Teacher@123');
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher.math@apexschool.edu' },
    update: {},
    create: {
      email: 'teacher.math@apexschool.edu',
      passwordHash: teacherPassword,
      firstName: 'Priya',
      lastName: 'Shah',
      phone: '+91 98111 00003',
      roles: { create: { roleId: teacherRole.id } },
      teacherProfile: {
        create: {
          employeeId: 'EMP-ECCE-01',
          qualification: 'Diploma in Early Childhood Education, Montessori Certified',
          specialization: 'Sensory & Reggio Play',
          departmentId: ecceDept.id,
        },
      },
    },
    include: { teacherProfile: true },
  });

  // Student (Aarav Patel in Playhouse-A)
  const studentPassword = await argon2.hash('Student@123');
  const playhouseClass = seededClasses.find((c) => c.name === 'Playhouse') || seededClasses[0];
  const sectionA = playhouseClass.sections.find((s) => s.name === 'A') || playhouseClass.sections[0];
  const sensorySubject = seededSubjects[0];

  const aaravUser = await prisma.user.upsert({
    where: { email: 'student.aarav@apexschool.edu' },
    update: {},
    create: {
      email: 'student.aarav@apexschool.edu',
      passwordHash: studentPassword,
      firstName: 'Aarav',
      lastName: 'Patel',
      phone: '+91 98111 00010',
      roles: { create: { roleId: studentRole.id } },
      studentProfile: {
        create: {
          admissionNumber: 'DK-2026-001',
          rollNumber: '01',
          dateOfBirth: new Date('2023-04-15'),
          gender: 'Male',
          guardianName: 'Ketan Patel',
          guardianPhone: '+91 98111 00011',
        },
      },
    },
    include: { studentProfile: true },
  });

  // Enroll Student in Playhouse Section A
  await prisma.studentEnrollment.upsert({
    where: {
      studentId_academicYearId: {
        studentId: aaravUser.studentProfile.id,
        academicYearId: currentYear.id,
      },
    },
    update: {},
    create: {
      studentId: aaravUser.studentProfile.id,
      academicYearId: currentYear.id,
      classId: playhouseClass.id,
      sectionId: sectionA.id,
      rollNumber: '01',
    },
  });

  // 7. Teacher Allocation: Teacher -> Playhouse A -> Sensory & Nature Play
  await prisma.teacherAllocation.upsert({
    where: {
      academicYearId_teacherId_subjectId_classId_sectionId: {
        academicYearId: currentYear.id,
        teacherId: teacherUser.teacherProfile.id,
        subjectId: sensorySubject.id,
        classId: playhouseClass.id,
        sectionId: sectionA.id,
      },
    },
    update: {},
    create: {
      academicYearId: currentYear.id,
      teacherId: teacherUser.teacherProfile.id,
      subjectId: sensorySubject.id,
      classId: playhouseClass.id,
      sectionId: sectionA.id,
    },
  });

  // 8. Timetable Slot: Monday Period 1 (09:00 - 09:45)
  await prisma.timetableSlot.upsert({
    where: {
      academicYearId_classId_sectionId_dayOfWeek_periodNumber: {
        academicYearId: currentYear.id,
        classId: playhouseClass.id,
        sectionId: sectionA.id,
        dayOfWeek: 1, // Monday
        periodNumber: 1,
      },
    },
    update: {},
    create: {
      academicYearId: currentYear.id,
      classId: playhouseClass.id,
      sectionId: sectionA.id,
      subjectId: sensorySubject.id,
      teacherId: teacherUser.teacherProfile.id,
      dayOfWeek: 1,
      periodNumber: 1,
      startTime: '09:00',
      endTime: '09:45',
    },
  });

  console.log('✅ Demo Allocations & Timetable Slots seeded.');
  console.log('\n🎉 Seed completed successfully into live Neon database!');
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

import dotenv from 'dotenv';
dotenv.config({ path: '.env', override: true });
dotenv.config({ path: '../.env', override: true });
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import crypto from 'crypto';

const dbUrl =
  process.env.DATABASE_URL ||
  'postgresql://neondb_owner:npg_BVX8kIyUqlO0@ep-cold-sky-b53itt32-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connect_timeout=30&pool_timeout=30&connection_limit=10';

const prisma = new PrismaClient({
  datasources: {
    db: { url: dbUrl },
  },
});

const firstNamesBoy = [
  'Aarav', 'Vihaan', 'Reyansh', 'Advik', 'Kabir', 'Ishaan', 'Vivaan', 'Dhruv',
  'Shivansh', 'Kian', 'Aryan', 'Samar', 'Atharv', 'Rudra', 'Shaurya', 'Ayaan',
  'Devansh', 'Hridaan', 'Yuvan', 'Tejas', 'Rishi', 'Parth', 'Manan', 'Ranveer',
  'Darsh', 'Neil', 'Advaith', 'Krish', 'Veer', 'Siddharth', 'Laksh', 'Ansh',
];

const firstNamesGirl = [
  'Ananya', 'Diya', 'Saanvi', 'Pari', 'Myra', 'Aadhya', 'Kiara', 'Anvi',
  'Riya', 'Tara', 'Avani', 'Isha', 'Ahana', 'Meera', 'Navya', 'Prisha',
  'Shanaya', 'Sara', 'Kavya', 'Anika', 'Siya', 'Vanya', 'Mira', 'Bhavya',
  'Tanvi', 'Nyra', 'Samaira', 'Trisha', 'Khushi', 'Aditi', 'Nisha', 'Palak',
];

const lastNames = [
  'Patel', 'Shah', 'Sharma', 'Verma', 'Mehta', 'Joshi', 'Trivedi', 'Dave',
  'Chauhan', 'Nair', 'Menon', 'Rao', 'Reddy', 'Iyer', 'Deshmukh', 'Kulkarni',
  'Gupta', 'Malhotra', 'Bhatia', 'Kapoor', 'Singh', 'Bhatt', 'Pandya', 'Rawat',
];

async function main() {
  console.log('⚡ Starting High-Speed Master Seeding into Neon PostgreSQL...');

  // 1. Roles
  const roles = [
    { name: 'PRINCIPAL', description: 'Executive School Leadership' },
    { name: 'HOD', description: 'Head of Department' },
    { name: 'COORDINATOR', description: 'Academic Operations Manager' },
    { name: 'TEACHER', description: 'Teaching Faculty' },
    { name: 'STUDENT', description: 'Enrolled Student' },
  ];

  const roleMap = {};
  for (const r of roles) {
    const role = await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
    roleMap[r.name] = role;
  }
  console.log('✅ Roles ready.');

  // 2. School Settings
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

  // 3. Academic Year 2026-2027
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

  // 4. Classes (Playhouse, Nursery, Jr. Kg, Sr. Kg)
  const classConfigs = [
    { name: 'Playhouse', order: 1, age: '2 to 3 years', total: 30, secA: 15, secB: 15 },
    { name: 'Nursery', order: 2, age: '3 to 4 years', total: 23, secA: 12, secB: 11 },
    { name: 'Jr. Kg', order: 3, age: '4 to 5 years', total: 45, secA: 23, secB: 22 },
    { name: 'Sr. Kg', order: 4, age: '5 to 6 years', total: 38, secA: 19, secB: 19 },
  ];

  const seededClasses = [];
  for (const cfg of classConfigs) {
    let cls = await prisma.class.findUnique({
      where: { name: cfg.name },
      include: { sections: true },
    });
    if (!cls) {
      cls = await prisma.class.create({
        data: {
          name: cfg.name,
          numericOrder: cfg.order,
          sections: {
            create: [
              { name: 'A', roomNumber: `Room 10${cfg.order}` },
              { name: 'B', roomNumber: `Room 20${cfg.order}` },
            ],
          },
        },
        include: { sections: true },
      });
    }
    seededClasses.push({ ...cfg, model: cls });
  }

  // 5. Department & 5 ECCE Subjects
  const ecceDept = await prisma.department.upsert({
    where: { code: 'ECCE' },
    update: {},
    create: { name: 'Early Childhood Care & Education', code: 'ECCE' },
  });

  const subjectsToSeed = [
    { name: 'Early Literacy & Phonics', code: 'LIT-01' },
    { name: 'Numeracy & Shapes', code: 'NUM-01' },
    { name: 'Sensory & Nature Play', code: 'SENSORY-01' },
    { name: 'Creative Arts & Puppetry', code: 'ART-01' },
    { name: 'Gross Motor & Agility', code: 'MOTOR-01' },
  ];

  const seededSubjects = [];
  for (const s of subjectsToSeed) {
    const sub = await prisma.subject.upsert({
      where: { code: s.code },
      update: { name: s.name },
      create: { name: s.name, code: s.code, departmentId: ecceDept.id },
    });
    seededSubjects.push(sub);
  }

  // 6. Pre-calculate Argon2 Password Hashes once
  console.log('🔐 Computing Argon2 password hashes...');
  const principalHash = await argon2.hash('Principal@123');
  const coordHash = await argon2.hash('Coordinator@123');
  const teacherHash = await argon2.hash('Teacher@123');
  const studentHash = await argon2.hash('Student@123');

  // Principal
  await prisma.user.upsert({
    where: { email: 'principal@apexschool.edu' },
    update: {},
    create: {
      email: 'principal@apexschool.edu',
      passwordHash: principalHash,
      firstName: 'Dr. Vikram',
      lastName: 'Malhotra',
      phone: '+91 98111 00001',
      roles: { create: { roleId: roleMap['PRINCIPAL'].id } },
    },
  });

  // Coordinator
  await prisma.user.upsert({
    where: { email: 'coordinator@apexschool.edu' },
    update: {},
    create: {
      email: 'coordinator@apexschool.edu',
      passwordHash: coordHash,
      firstName: 'Sunita',
      lastName: 'Nambiar',
      phone: '+91 98111 00002',
      roles: { create: { roleId: roleMap['COORDINATOR'].id } },
    },
  });

  // 5 Teachers
  const teacherDefs = [
    { email: 'teacher.priya@apexschool.edu', firstName: 'Priya', lastName: 'Shah', phone: '+91 98111 00101', empId: 'EMP-TCH-01', spec: 'Early Literacy & Phonics', subCode: 'LIT-01' },
    { email: 'teacher.anjali@apexschool.edu', firstName: 'Anjali', lastName: 'Sharma', phone: '+91 98111 00102', empId: 'EMP-TCH-02', spec: 'Numeracy & Shapes', subCode: 'NUM-01' },
    { email: 'teacher.kavita@apexschool.edu', firstName: 'Kavita', lastName: 'Mehta', phone: '+91 98111 00103', empId: 'EMP-TCH-03', spec: 'Sensory & Nature Play', subCode: 'SENSORY-01' },
    { email: 'teacher.rohan@apexschool.edu', firstName: 'Rohan', lastName: 'Verma', phone: '+91 98111 00104', empId: 'EMP-TCH-04', spec: 'Creative Arts & Puppetry', subCode: 'ART-01' },
    { email: 'teacher.sunil@apexschool.edu', firstName: 'Sunil', lastName: 'Patel', phone: '+91 98111 00105', empId: 'EMP-TCH-05', spec: 'Gross Motor & Agility', subCode: 'MOTOR-01' },
    // Also keep alias for existing button
    { email: 'teacher.math@apexschool.edu', firstName: 'Priya', lastName: 'Shah', phone: '+91 98111 00100', empId: 'EMP-TCH-00', spec: 'Early Literacy & Phonics', subCode: 'LIT-01' },
  ];

  const seededTeachers = [];
  for (const td of teacherDefs) {
    let tUser = await prisma.user.findUnique({
      where: { email: td.email },
      include: { teacherProfile: true },
    });
    if (!tUser) {
      tUser = await prisma.user.create({
        data: {
          email: td.email,
          passwordHash: teacherHash,
          firstName: td.firstName,
          lastName: td.lastName,
          phone: td.phone,
          roles: { create: { roleId: roleMap['TEACHER'].id } },
          teacherProfile: {
            create: {
              employeeId: td.empId,
              qualification: 'ECCE Montessori Certified Educator',
              specialization: td.spec,
              departmentId: ecceDept.id,
            },
          },
        },
        include: { teacherProfile: true },
      });
    }
    const matchedSub = seededSubjects.find((s) => s.code === td.subCode) || seededSubjects[0];
    seededTeachers.push({ ...td, user: tUser, subject: matchedSub });
  }
  console.log('✅ 5 Teachers seeded.');

  // Allocations for all 4 classes & sections in 1 batch
  const allocationsToInsert = [];
  for (const clsData of seededClasses) {
    for (const sec of clsData.model.sections) {
      for (const t of seededTeachers) {
        if (!t.user.teacherProfile?.id) continue;
        allocationsToInsert.push({
          academicYearId: currentYear.id,
          teacherId: t.user.teacherProfile.id,
          subjectId: t.subject.id,
          classId: clsData.model.id,
          sectionId: sec.id,
        });
      }
    }
  }

  await prisma.teacherAllocation.createMany({
    data: allocationsToInsert,
    skipDuplicates: true,
  });
  console.log('✅ Allocations ready in 1 query.');
  console.log('✅ Allocations ready.');

  // 7. Generate Bulk Arrays for 136 Students
  console.log('📦 Preparing bulk data for 136 students...');
  const usersToInsert = [];
  const profilesToInsert = [];
  const userRolesToInsert = [];
  const enrollmentsToInsert = [];

  let studentNum = 1;

  for (const clsData of seededClasses) {
    const cls = clsData.model;
    const secA = cls.sections.find((s) => s.name === 'A') || cls.sections[0];
    const secB = cls.sections.find((s) => s.name === 'B') || cls.sections[1] || cls.sections[0];

    // Section A
    for (let i = 1; i <= clsData.secA; i++) {
      const idx = studentNum;
      const isBoy = idx % 2 === 1;
      const fName = isBoy ? firstNamesBoy[(idx - 1) % firstNamesBoy.length] : firstNamesGirl[(idx - 1) % firstNamesGirl.length];
      const lName = lastNames[(idx + i) % lastNames.length];
      const rollNumber = String(i).padStart(2, '0');
      const admissionNumber = `DK-2026-${String(idx).padStart(3, '0')}`;
      const email = `student.${fName.toLowerCase()}${idx}@apexschool.edu`;
      const userId = crypto.randomUUID();
      const profileId = crypto.randomUUID();

      usersToInsert.push({
        id: userId,
        email,
        passwordHash: studentHash,
        firstName: fName,
        lastName: lName,
        phone: `+91 98${String(10000000 + idx)}`,
        isActive: true,
      });

      profilesToInsert.push({
        id: profileId,
        userId,
        admissionNumber,
        rollNumber,
        dateOfBirth: new Date(2021, idx % 12, (idx % 27) + 1),
        gender: isBoy ? 'Male' : 'Female',
        guardianName: `Parent of ${fName} ${lName}`,
        guardianPhone: `+91 97${String(20000000 + idx)}`,
        address: `House ${idx}, Phase 2, Rajkot, Gujarat`,
      });

      userRolesToInsert.push({
        userId,
        roleId: roleMap['STUDENT'].id,
      });

      enrollmentsToInsert.push({
        id: crypto.randomUUID(),
        studentId: profileId,
        academicYearId: currentYear.id,
        classId: cls.id,
        sectionId: secA.id,
        rollNumber,
        isActive: true,
      });

      studentNum++;
    }

    // Section B
    for (let j = 1; j <= clsData.secB; j++) {
      const idx = studentNum;
      const isBoy = idx % 2 === 1;
      const fName = isBoy ? firstNamesBoy[(idx - 1) % firstNamesBoy.length] : firstNamesGirl[(idx - 1) % firstNamesGirl.length];
      const lName = lastNames[(idx + j) % lastNames.length];
      const rollNumber = String(j).padStart(2, '0');
      const admissionNumber = `DK-2026-${String(idx).padStart(3, '0')}`;
      const email = `student.${fName.toLowerCase()}${idx}@apexschool.edu`;
      const userId = crypto.randomUUID();
      const profileId = crypto.randomUUID();

      usersToInsert.push({
        id: userId,
        email,
        passwordHash: studentHash,
        firstName: fName,
        lastName: lName,
        phone: `+91 98${String(10000000 + idx)}`,
        isActive: true,
      });

      profilesToInsert.push({
        id: profileId,
        userId,
        admissionNumber,
        rollNumber,
        dateOfBirth: new Date(2021, idx % 12, (idx % 27) + 1),
        gender: isBoy ? 'Male' : 'Female',
        guardianName: `Parent of ${fName} ${lName}`,
        guardianPhone: `+91 97${String(20000000 + idx)}`,
        address: `House ${idx}, University Road, Rajkot, Gujarat`,
      });

      userRolesToInsert.push({
        userId,
        roleId: roleMap['STUDENT'].id,
      });

      enrollmentsToInsert.push({
        id: crypto.randomUUID(),
        studentId: profileId,
        academicYearId: currentYear.id,
        classId: cls.id,
        sectionId: secB.id,
        rollNumber,
        isActive: true,
      });

      studentNum++;
    }
  }

  // Also include demo student Aarav Patel (DK-2026-DEMO)
  const aaravUserId = crypto.randomUUID();
  const aaravProfileId = crypto.randomUUID();
  const playhouseModel = seededClasses[0].model;
  const playhouseSecA = playhouseModel.sections.find((s) => s.name === 'A') || playhouseModel.sections[0];

  usersToInsert.push({
    id: aaravUserId,
    email: 'student.aarav@apexschool.edu',
    passwordHash: studentHash,
    firstName: 'Aarav',
    lastName: 'Patel',
    phone: '+91 98111 00010',
    isActive: true,
  });

  profilesToInsert.push({
    id: aaravProfileId,
    userId: aaravUserId,
    admissionNumber: 'DK-2026-DEMO',
    rollNumber: '01',
    dateOfBirth: new Date('2023-04-15'),
    gender: 'Male',
    guardianName: 'Ketan Patel',
    guardianPhone: '+91 98111 00011',
    address: 'Rajkot, Gujarat',
  });

  userRolesToInsert.push({
    userId: aaravUserId,
    roleId: roleMap['STUDENT'].id,
  });

  enrollmentsToInsert.push({
    id: crypto.randomUUID(),
    studentId: aaravProfileId,
    academicYearId: currentYear.id,
    classId: playhouseModel.id,
    sectionId: playhouseSecA.id,
    rollNumber: '01',
    isActive: true,
  });

  console.log(`🚀 Bulk inserting ${usersToInsert.length} students into Neon DB...`);

  // Execute createMany with skipDuplicates: true
  await prisma.user.createMany({
    data: usersToInsert,
    skipDuplicates: true,
  });
  console.log('✅ Users inserted.');

  // For profiles, ensure user IDs match existing users if any duplicate emails were skipped
  const existingUsers = await prisma.user.findMany({
    where: { email: { in: usersToInsert.map((u) => u.email) } },
    select: { id: true, email: true },
  });
  const emailToUserId = new Map(existingUsers.map((u) => [u.email, u.id]));

  for (let k = 0; k < profilesToInsert.length; k++) {
    const prof = profilesToInsert[k];
    const uEmail = usersToInsert[k]?.email;
    if (uEmail && emailToUserId.has(uEmail)) {
      prof.userId = emailToUserId.get(uEmail);
    }
  }

  await prisma.studentProfile.createMany({
    data: profilesToInsert,
    skipDuplicates: true,
  });
  console.log('✅ Student Profiles inserted.');

  // User Roles
  const rolesWithRealIds = existingUsers.map((u) => ({
    userId: u.id,
    roleId: roleMap['STUDENT'].id,
  }));
  await prisma.userRole.createMany({
    data: rolesWithRealIds,
    skipDuplicates: true,
  });
  console.log('✅ Student User Roles inserted.');

  // Enrollments
  const allProfiles = await prisma.studentProfile.findMany({
    select: { id: true, admissionNumber: true },
  });
  const admMap = new Map(allProfiles.map((p) => [p.admissionNumber, p.id]));

  const validEnrollments = [];
  for (let m = 0; m < enrollmentsToInsert.length; m++) {
    const enr = enrollmentsToInsert[m];
    const adm = profilesToInsert[m]?.admissionNumber;
    if (adm && admMap.has(adm)) {
      enr.studentId = admMap.get(adm);
      validEnrollments.push(enr);
    }
  }

  console.log(`📝 Inserting ${validEnrollments.length} valid student enrollments...`);
  await prisma.studentEnrollment.createMany({
    data: validEnrollments,
    skipDuplicates: true,
  });
  console.log('✅ Student Enrollments inserted.');

  // 8. Seed Live Attendance Session for Today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const priyaTeacher = seededTeachers[0];
  const litSubject = seededSubjects[0];

  for (const clsData of seededClasses) {
    for (const sec of clsData.model.sections) {
      let session = await prisma.attendanceSession.findFirst({
        where: {
          academicYearId: currentYear.id,
          classId: clsData.model.id,
          sectionId: sec.id,
          date: today,
          periodNumber: 1,
        },
      });

      if (!session) {
        session = await prisma.attendanceSession.create({
          data: {
            academicYearId: currentYear.id,
            classId: clsData.model.id,
            sectionId: sec.id,
            subjectId: litSubject.id,
            teacherId: priyaTeacher.user.teacherProfile.id,
            date: today,
            periodNumber: 1,
            status: 'FINALIZED',
            isFinalized: true,
            finalizedAt: new Date(),
          },
        });
      }

      const enrolled = await prisma.studentEnrollment.findMany({
        where: { classId: clsData.model.id, sectionId: sec.id, academicYearId: currentYear.id },
      });

      const recordsData = enrolled.map((enr, idx) => ({
        sessionId: session.id,
        studentId: enr.studentId,
        status: idx % 12 === 0 ? 'ABSENT' : idx % 15 === 0 ? 'LATE' : 'PRESENT',
      }));

      await prisma.attendanceRecord.createMany({
        data: recordsData,
        skipDuplicates: true,
      });
    }
  }
  console.log('✅ Attendance Sessions & Records seeded for today.');

  console.log('\n======================================================');
  console.log('🎉 HIGH-SPEED MASTER SEED COMPLETED SUCCESSFULLY!');
  console.log('======================================================');
  console.log('4 CLASSES SEEDED:');
  console.log('1. Playhouse: 30 Students');
  console.log('2. Nursery:   23 Students');
  console.log('3. Jr. Kg:    45 Students');
  console.log('4. Sr. Kg:    38 Students');
  console.log('TOTAL STUDENTS: 136');
  console.log('======================================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Fast seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

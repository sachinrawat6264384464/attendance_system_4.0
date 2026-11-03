import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { AssignmentSubmissionStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  CreateAssignmentDto,
  SubmitAssignmentDto,
  ReviewSubmissionDto,
} from './dto/assignment.dto.js';

@Injectable()
export class AssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  // ---------------- TEACHER: CREATE ASSIGNMENT ----------------
  async createAssignment(teacherProfileId: string, dto: CreateAssignmentDto) {
    // Verify allocation
    const allocation = await this.prisma.teacherAllocation.findFirst({
      where: {
        academicYearId: dto.academicYearId,
        teacherId: teacherProfileId,
        subjectId: dto.subjectId,
        classId: dto.classId,
        sectionId: dto.sectionId,
      },
    });

    if (!allocation) {
      throw new ForbiddenException(
        'You are not allocated to teach this subject in this class & section.',
      );
    }

    return this.prisma.assignment.create({
      data: {
        title: dto.title,
        description: dto.description,
        instructions: dto.instructions,
        subjectId: dto.subjectId,
        classId: dto.classId,
        sectionId: dto.sectionId,
        teacherId: teacherProfileId,
        academicYearId: dto.academicYearId,
        dueDate: new Date(dto.dueDate),
        maxMarks: dto.maxMarks ?? 100.0,
        isSubmissionEnabled: dto.isSubmissionEnabled ?? true,
        attachments: dto.attachments?.length
          ? {
              create: dto.attachments.map((att) => ({
                fileUrl: att.fileUrl,
                publicId: att.publicId,
                fileName: att.fileName,
                fileSize: att.fileSize,
                mimeType: att.mimeType,
                resourceType: att.resourceType || 'auto',
              })),
            }
          : undefined,
      },
      include: {
        subject: true,
        class: true,
        section: true,
        attachments: true,
      },
    });
  }

  // ---------------- LIST ASSIGNMENTS ----------------
  async getAssignments(
    classId?: string,
    sectionId?: string,
    subjectId?: string,
    teacherProfileId?: string,
    studentProfileId?: string,
  ) {
    let whereClassId = classId;
    let whereSectionId = sectionId;

    if (studentProfileId && (!whereClassId || !whereSectionId)) {
      const enrollment = await this.prisma.studentEnrollment.findFirst({
        where: { studentId: studentProfileId, isActive: true },
      });
      if (enrollment) {
        whereClassId = enrollment.classId;
        whereSectionId = enrollment.sectionId;
      }
    }

    const assignments = await this.prisma.assignment.findMany({
      where: {
        classId: whereClassId,
        sectionId: whereSectionId,
        subjectId,
        teacherId: teacherProfileId,
      },
      include: {
        subject: true,
        class: true,
        section: true,
        teacher: { include: { user: { select: { firstName: true, lastName: true } } } },
        attachments: true,
        submissions: studentProfileId
          ? {
              where: { studentId: studentProfileId },
              include: { review: true },
            }
          : { select: { id: true, status: true } },
      },
      orderBy: { dueDate: 'asc' },
    });

    return assignments;
  }

  // ---------------- GET ASSIGNMENT DETAILS ----------------
  async getAssignmentById(id: string, studentProfileId?: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
      include: {
        subject: true,
        class: true,
        section: true,
        teacher: { include: { user: { select: { firstName: true, lastName: true, email: true } } } },
        attachments: true,
        submissions: studentProfileId
          ? {
              where: { studentId: studentProfileId },
              include: { review: true },
            }
          : undefined,
      },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found.');
    }

    return assignment;
  }

  // ---------------- STUDENT: START ASSIGNMENT ----------------
  async startAssignment(assignmentId: string, studentProfileId: string) {
    const assignment = await this.prisma.assignment.findUnique({ where: { id: assignmentId } });
    if (!assignment) {
      throw new NotFoundException('Assignment not found.');
    }

    const submission = await this.prisma.assignmentSubmission.findUnique({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId: studentProfileId,
        },
      },
    });

    if (submission) {
      return submission; // already started or submitted
    }

    return this.prisma.assignmentSubmission.create({
      data: {
        assignmentId,
        studentId: studentProfileId,
        status: AssignmentSubmissionStatus.STARTED,
      },
    });
  }

  // ---------------- STUDENT: SUBMIT ASSIGNMENT ----------------
  async submitAssignment(assignmentId: string, studentProfileId: string, dto: SubmitAssignmentDto) {
    const assignment = await this.prisma.assignment.findUnique({ where: { id: assignmentId } });
    if (!assignment) {
      throw new NotFoundException('Assignment not found.');
    }

    if (!assignment.isSubmissionEnabled) {
      throw new BadRequestException('Online submission is disabled for this assignment.');
    }

    const now = new Date();
    const isLate = now > assignment.dueDate;

    return this.prisma.assignmentSubmission.upsert({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId: studentProfileId,
        },
      },
      create: {
        assignmentId,
        studentId: studentProfileId,
        status: AssignmentSubmissionStatus.SUBMITTED,
        submissionText: dto.submissionText,
        fileUrl: dto.fileUrl,
        filePublicId: dto.filePublicId,
        resourceType: dto.resourceType || 'auto',
        submittedAt: now,
        isLate,
      },
      update: {
        status: AssignmentSubmissionStatus.SUBMITTED,
        submissionText: dto.submissionText,
        fileUrl: dto.fileUrl,
        filePublicId: dto.filePublicId,
        resourceType: dto.resourceType || 'auto',
        submittedAt: now,
        isLate,
      },
      include: {
        assignment: { select: { title: true, dueDate: true } },
      },
    });
  }

  // ---------------- TEACHER: VIEW SUBMISSIONS ----------------
  async getAssignmentSubmissions(assignmentId: string, teacherProfileId: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        submissions: {
          include: {
            student: {
              include: {
                user: { select: { firstName: true, lastName: true, email: true } },
              },
            },
            review: true,
          },
          orderBy: { submittedAt: 'desc' },
        },
      },
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found.');
    }

    if (assignment.teacherId !== teacherProfileId) {
      throw new ForbiddenException('You are not authorized to view submissions for another teacher assignment.');
    }

    return assignment.submissions;
  }

  // ---------------- TEACHER: REVIEW & GRADE SUBMISSION ----------------
  async reviewSubmission(submissionId: string, teacherProfileId: string, dto: ReviewSubmissionDto) {
    const submission = await this.prisma.assignmentSubmission.findUnique({
      where: { id: submissionId },
      include: { assignment: true },
    });

    if (!submission) {
      throw new NotFoundException('Submission not found.');
    }

    if (submission.assignment.teacherId !== teacherProfileId) {
      throw new ForbiddenException('You cannot grade an assignment created by another teacher.');
    }

    return this.prisma.$transaction(async (tx) => {
      const review = await tx.assignmentReview.upsert({
        where: { submissionId },
        create: {
          submissionId,
          teacherId: teacherProfileId,
          marksObtained: dto.marksObtained,
          feedback: dto.feedback,
        },
        update: {
          marksObtained: dto.marksObtained,
          feedback: dto.feedback,
          reviewedAt: new Date(),
        },
      });

      await tx.assignmentSubmission.update({
        where: { id: submissionId },
        data: { status: AssignmentSubmissionStatus.REVIEWED },
      });

      return {
        review,
        message: 'Submission reviewed and graded successfully.',
      };
    });
  }
}


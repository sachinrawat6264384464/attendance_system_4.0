import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { AssignmentsService } from './assignments.service.js';
import {
  CreateAssignmentDto,
  SubmitAssignmentDto,
  ReviewSubmissionDto,
} from './dto/assignment.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser, AuthenticatedUser } from '../common/decorators/current-user.decorator.js';

@ApiTags('Assignments & Coursework')
@Controller('assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @Roles(RoleType.TEACHER)
  @ApiOperation({ summary: 'Create new coursework assignment with attachments' })
  createAssignment(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateAssignmentDto,
  ) {
    if (!user.teacherProfileId) {
      throw new ForbiddenException('Teacher profile not found.');
    }
    return this.assignmentsService.createAssignment(user.teacherProfileId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List assignments scoped to class, section, teacher or student' })
  getAssignments(
    @CurrentUser() user: AuthenticatedUser,
    @Query('classId') classId?: string,
    @Query('sectionId') sectionId?: string,
    @Query('subjectId') subjectId?: string,
  ) {
    const isStudent = user.roles.includes(RoleType.STUDENT);
    const isTeacher = user.roles.includes(RoleType.TEACHER);

    return this.assignmentsService.getAssignments(
      classId,
      sectionId,
      subjectId,
      isTeacher && !classId ? user.teacherProfileId : undefined,
      isStudent ? user.studentProfileId : undefined,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get assignment details, attachments, and personal submission' })
  getAssignmentById(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const isStudent = user.roles.includes(RoleType.STUDENT);
    return this.assignmentsService.getAssignmentById(id, isStudent ? user.studentProfileId : undefined);
  }

  @Patch(':id/start')
  @Roles(RoleType.STUDENT)
  @ApiOperation({ summary: 'Mark assignment as STARTED' })
  startAssignment(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    if (!user.studentProfileId) {
      throw new ForbiddenException('Student profile not found.');
    }
    return this.assignmentsService.startAssignment(id, user.studentProfileId);
  }

  @Post(':id/submit')
  @Roles(RoleType.STUDENT)
  @ApiOperation({ summary: 'Submit assignment with notes or Cloudinary uploaded file' })
  submitAssignment(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: SubmitAssignmentDto,
  ) {
    if (!user.studentProfileId) {
      throw new ForbiddenException('Student profile not found.');
    }
    return this.assignmentsService.submitAssignment(id, user.studentProfileId, dto);
  }

  @Get(':id/submissions')
  @Roles(RoleType.TEACHER)
  @ApiOperation({ summary: 'View all student submissions for an assignment' })
  getAssignmentSubmissions(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    if (!user.teacherProfileId) {
      throw new ForbiddenException('Teacher profile not found.');
    }
    return this.assignmentsService.getAssignmentSubmissions(id, user.teacherProfileId);
  }

  @Post('submissions/:submissionId/review')
  @Roles(RoleType.TEACHER)
  @ApiOperation({ summary: 'Review and grade student submission with feedback' })
  reviewSubmission(
    @Param('submissionId') submissionId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ReviewSubmissionDto,
  ) {
    if (!user.teacherProfileId) {
      throw new ForbiddenException('Teacher profile not found.');
    }
    return this.assignmentsService.reviewSubmission(submissionId, user.teacherProfileId, dto);
  }
}


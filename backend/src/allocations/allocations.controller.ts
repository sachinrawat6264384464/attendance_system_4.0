import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { AllocationsService } from './allocations.service.js';
import { CreateAllocationDto } from './dto/allocation.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@ApiTags('Teacher Allocations')
@Controller('allocations')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AllocationsController {
  constructor(private readonly allocationsService: AllocationsService) {}

  @Get()
  @ApiOperation({ summary: 'List teacher subject allocations' })
  getAllocations(
    @Query('academicYearId') academicYearId?: string,
    @Query('teacherId') teacherId?: string,
    @Query('classId') classId?: string,
    @Query('sectionId') sectionId?: string,
  ) {
    return this.allocationsService.getAllocations(academicYearId, teacherId, classId, sectionId);
  }

  @Post()
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Allocate a teacher to a subject, class, and section' })
  createAllocation(@Body() dto: CreateAllocationDto) {
    return this.allocationsService.createAllocation(dto);
  }

  @Delete(':id')
  @Roles(RoleType.PRINCIPAL, RoleType.COORDINATOR)
  @ApiOperation({ summary: 'Remove a teacher allocation' })
  deleteAllocation(@Param('id') id: string) {
    return this.allocationsService.deleteAllocation(id);
  }
}


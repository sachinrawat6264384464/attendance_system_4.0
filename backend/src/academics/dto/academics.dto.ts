import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsBoolean, IsInt, Min } from 'class-validator';

export class CreateAcademicYearDto {
  @ApiProperty({ example: '2026-2027' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '2026-04-01' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: '2027-03-31' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isCurrent?: boolean;
}

export class CreateDepartmentDto {
  @ApiProperty({ example: 'Science' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'SCI' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  hodId?: string;
}

export class CreateClassDto {
  @ApiProperty({ example: 'Grade 10' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  numericOrder: number;
}

export class CreateSectionDto {
  @ApiProperty({ example: 'class-uuid-here' })
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty({ example: 'A' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Room 204' })
  @IsString()
  @IsOptional()
  roomNumber?: string;
}

export class CreateSubjectDto {
  @ApiProperty({ example: 'Mathematics' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'MATH-10' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  departmentId?: string;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsOptional()
  isElective?: boolean;
}


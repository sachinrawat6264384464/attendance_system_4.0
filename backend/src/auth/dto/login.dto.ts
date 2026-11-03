import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'principal@apexschool.edu' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'AdminPassword@123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}


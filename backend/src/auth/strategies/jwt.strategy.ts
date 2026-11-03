import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service.js';

export interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET') || 'apex_default_secret_key',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        isActive: true,
        mustChangePassword: true,
        roles: {
          select: {
            role: {
              select: { name: true },
            },
          },
        },
        teacherProfile: {
          select: { id: true, employeeId: true, departmentId: true },
        },
        studentProfile: {
          select: { id: true, admissionNumber: true },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('User account is inactive or not found.');
    }

    return {
      userId: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.role.name),
      mustChangePassword: user.mustChangePassword,
      teacherProfileId: user.teacherProfile?.id,
      studentProfileId: user.studentProfile?.id,
      departmentId: user.teacherProfile?.departmentId,
    };
  }
}


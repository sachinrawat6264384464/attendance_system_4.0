import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async login(loginDto: LoginDto, ipAddress?: string, userAgent?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email.toLowerCase().trim() },
      include: {
        roles: {
          include: { role: true },
        },
        teacherProfile: true,
        studentProfile: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('This account has been deactivated. Contact administration.');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const roles = user.roles.map((r) => r.role.name);
    const tokens = await this.generateTokens(user.id, user.email, roles);

    // Save refresh token hash
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: this.hashToken(tokens.refreshToken),
        expiresAt,
      },
    });

    // Log login action
    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'USER_LOGIN',
        resourceType: 'AUTH',
        resourceId: user.id,
        ipAddress,
        userAgent,
        payload: { email: user.email, roles },
      },
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles,
        mustChangePassword: user.mustChangePassword,
        teacherProfileId: user.teacherProfile?.id,
        studentProfileId: user.studentProfile?.id,
      },
      ...tokens,
    };
  }

  async refreshTokens(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required.');
    }

    const tokenHash = this.hashToken(refreshToken);
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: {
        user: {
          include: {
            roles: { include: { role: true } },
            teacherProfile: true,
            studentProfile: true,
          },
        },
      },
    });

    if (!storedToken || storedToken.revokedAt || new Date() > storedToken.expiresAt) {
      throw new UnauthorizedException('Refresh token is invalid or expired.');
    }

    // Revoke old token (Token Rotation)
    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revokedAt: new Date() },
    });

    const user = storedToken.user;
    if (!user.isActive) {
      throw new UnauthorizedException('User account is deactivated.');
    }

    const roles = user.roles.map((r) => r.role.name);
    const tokens = await this.generateTokens(user.id, user.email, roles);

    // Save new refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: this.hashToken(tokens.refreshToken),
        expiresAt,
      },
    });

    return tokens;
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      const tokenHash = this.hashToken(refreshToken);
      await this.prisma.refreshToken.updateMany({
        where: { userId, tokenHash, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }

    return { message: 'Logged out successfully.' };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const isCurrentValid = await argon2.verify(user.passwordHash, changePasswordDto.oldPassword);
    if (!isCurrentValid) {
      throw new BadRequestException('Current password does not match.');
    }

    const newHash = await argon2.hash(changePasswordDto.newPassword);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newHash,
        mustChangePassword: false,
      },
    });

    // Revoke all existing refresh tokens for security
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });

    return { message: 'Password updated successfully. Please log in with your new credentials.' };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatarUrl: true,
        mustChangePassword: true,
        roles: {
          select: { role: { select: { name: true, description: true } } },
        },
        teacherProfile: {
          include: { department: true },
        },
        studentProfile: {
          include: {
            studentEnrollments: {
              where: { isActive: true },
              include: {
                class: true,
                section: true,
                academicYear: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    return {
      ...user,
      roles: user.roles.map((r) => r.role.name),
    };
  }

  private async generateTokens(userId: string, email: string, roles: string[]) {
    const payload = { sub: userId, email, roles };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET') || 'apex_default_secret_key',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'apex_default_refresh_key',
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}


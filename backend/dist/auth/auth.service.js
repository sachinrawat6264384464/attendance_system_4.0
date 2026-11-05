var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
import { Injectable, UnauthorizedException, BadRequestException, Logger, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service.js';
let AuthService = AuthService_1 = class AuthService {
    prisma;
    jwtService;
    configService;
    logger = new Logger(AuthService_1.name);
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    hashToken(token) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
    async login(loginDto, ipAddress, userAgent) {
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
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash: this.hashToken(tokens.refreshToken),
                expiresAt,
            },
        });
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
    async refreshTokens(refreshToken) {
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
    async logout(userId, refreshToken) {
        if (refreshToken) {
            const tokenHash = this.hashToken(refreshToken);
            await this.prisma.refreshToken.updateMany({
                where: { userId, tokenHash, revokedAt: null },
                data: { revokedAt: new Date() },
            });
        }
        return { message: 'Logged out successfully.' };
    }
    async changePassword(userId, changePasswordDto) {
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
        await this.prisma.refreshToken.updateMany({
            where: { userId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
        return { message: 'Password updated successfully. Please log in with your new credentials.' };
    }
    async getProfile(userId) {
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
    async generateTokens(userId, email, roles) {
        const payload = { sub: userId, email, roles };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_ACCESS_SECRET') || 'apex_default_secret_key',
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET') || 'apex_default_refresh_key',
                expiresIn: '7d',
            }),
        ]);
        return { accessToken, refreshToken };
    }
};
AuthService = AuthService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, UploadedFile, UseInterceptors, UseGuards, Query, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FilesService } from './files.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
let FilesController = class FilesController {
    filesService;
    constructor(filesService) {
        this.filesService = filesService;
    }
    uploadFile(file, folder) {
        return this.filesService.uploadFile(file, folder || 'attachments');
    }
};
__decorate([
    Post('upload'),
    UseInterceptors(FileInterceptor('file')),
    ApiConsumes('multipart/form-data'),
    ApiOperation({ summary: 'Stream upload file (PDF, image, document) to Cloudinary' }),
    __param(0, UploadedFile()),
    __param(1, Query('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadFile", null);
FilesController = __decorate([
    ApiTags('File Management'),
    Controller('files'),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    __metadata("design:paramtypes", [FilesService])
], FilesController);
export { FilesController };
//# sourceMappingURL=files.controller.js.map
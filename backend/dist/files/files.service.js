var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FilesService_1;
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
let FilesService = FilesService_1 = class FilesService {
    configService;
    logger = new Logger(FilesService_1.name);
    constructor(configService) {
        this.configService = configService;
        cloudinary.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
            secure: true,
        });
    }
    async uploadFile(file, subfolder = 'attachments') {
        if (!file) {
            throw new BadRequestException('No file provided for upload.');
        }
        const baseFolder = this.configService.get('CLOUDINARY_FOLDER') || 'apex_school_system';
        const targetFolder = `${baseFolder}/${subfolder}`;
        const isImage = file.mimetype.startsWith('image/');
        const resourceType = isImage ? 'image' : 'auto';
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                folder: targetFolder,
                resource_type: resourceType,
                use_filename: true,
                unique_filename: true,
            }, (error, result) => {
                if (error || !result) {
                    this.logger.error('Cloudinary stream upload error:', error);
                    return reject(new BadRequestException(`File upload failed: ${error?.message || 'Unknown error'}`));
                }
                resolve({
                    secureUrl: result.secure_url,
                    publicId: result.public_id,
                    resourceType: result.resource_type,
                    fileName: file.originalname,
                    fileSize: file.size,
                    mimeType: file.mimetype,
                });
            });
            const readableStream = new Readable();
            readableStream.push(file.buffer);
            readableStream.push(null);
            readableStream.pipe(uploadStream);
        });
    }
};
FilesService = FilesService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], FilesService);
export { FilesService };
//# sourceMappingURL=files.service.js.map
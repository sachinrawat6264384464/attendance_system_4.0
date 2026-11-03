import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

export interface ExpressUploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  async uploadFile(
    file: ExpressUploadedFile,
    subfolder = 'attachments',
  ): Promise<{
    secureUrl: string;
    publicId: string;
    resourceType: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
  }> {
    if (!file) {
      throw new BadRequestException('No file provided for upload.');
    }

    const baseFolder = this.configService.get<string>('CLOUDINARY_FOLDER') || 'apex_school_system';
    const targetFolder = `${baseFolder}/${subfolder}`;

    // Explicit resource_type: non-images and PDFs must use 'auto' or 'raw'
    const isImage = file.mimetype.startsWith('image/');
    const resourceType = isImage ? 'image' : 'auto';

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: targetFolder,
          resource_type: resourceType,
          use_filename: true,
          unique_filename: true,
        },
        (error, result?: UploadApiResponse) => {
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
        },
      );

      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  }
}

import { ConfigService } from '@nestjs/config';
export interface ExpressUploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}
export declare class FilesService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    uploadFile(file: ExpressUploadedFile, subfolder?: string): Promise<{
        secureUrl: string;
        publicId: string;
        resourceType: string;
        fileName: string;
        fileSize: number;
        mimeType: string;
    }>;
}

import { FilesService } from './files.service.js';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: any, folder?: string): Promise<{
        secureUrl: string;
        publicId: string;
        resourceType: string;
        fileName: string;
        fileSize: number;
        mimeType: string;
    }>;
}

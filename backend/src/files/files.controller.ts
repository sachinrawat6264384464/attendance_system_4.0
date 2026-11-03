import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { FilesService, ExpressUploadedFile } from './files.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';

@ApiTags('File Management')
@Controller('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Stream upload file (PDF, image, document) to Cloudinary' })
  uploadFile(
    @UploadedFile() file: any,
    @Query('folder') folder?: string,
  ) {
    return this.filesService.uploadFile(file as ExpressUploadedFile, folder || 'attachments');
  }
}

import { Body, Controller, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MediaFileService } from './media-file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('media-file')
export class MediaFileController {
  constructor(private readonly mediaFileService: MediaFileService) {
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  uploadFile(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/*',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 2, // 2MB
          message: 'File is too large!'
        })
        .build()
    ) file: Express.Multer.File
  ) {

  }
}

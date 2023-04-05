import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { parse, join } from 'path';
import * as sharp from 'sharp';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async testUpload(@UploadedFile() image: Express.Multer.File, @Res() resp) {
    console.log(image);
    const originalName = parse(image.originalname).name;
    const ext = parse(image.originalname).ext;

    const filename = Date.now() + '-' + originalName + ext;

    await sharp(image.buffer)
      .resize(800)
      .webp({ effort: 3 })
      .toFile(join('uploads', filename));

    const test = 'http://localhost:3000/public/' + filename;
    return resp.json({
      body: {
        imageUrl: test,
      },
    });
  }
}

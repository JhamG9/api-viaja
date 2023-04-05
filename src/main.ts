import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { mkdirp } from 'mkdirp';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const made = mkdirp.sync('tmp/foo/bar');
  console.log(`made directories, starting with ${made}`);

  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', '/tmp/foo/bar'), {
    index: false,
    prefix: '/public',
  });

  await app.listen(3000);
}
bootstrap();

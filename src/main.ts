import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets('public');

  const config = new DocumentBuilder()
    .setTitle('Practice NestJs Auth')
    .setVersion('0.1')
    .addTag('user')
    .addTag('movie')
    .setDescription('Recommended to code repeatedly to help you get familiar with Guards')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(port).then(() => {
    logger.debug(`Running on localhost:${port}`);
  });
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from './common/config/config';
import logger from './common/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(Number(CONFIG.PARAMS.APP.BACKEND_PORT));
  logger.info(`App listening on port - ${CONFIG.PARAMS.APP.BACKEND_PORT}`);
}
bootstrap();

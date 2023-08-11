import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from './infra/config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(CONFIG.PARAMS.APP.BACKEND_PORT));
}
bootstrap();

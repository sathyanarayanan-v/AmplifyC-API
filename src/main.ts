import { config } from 'dotenv';

import { Logger } from '@nestjs/common';

function setupServer() {
  const port = parseInt(process.env.PORT, 10) || 6338;
  const host = process.env.HOST || '0.0.0.0';
  const globalPrefix = process.env.GLOBAL_PREFIX || 'api/v1';
  return { port, host, globalPrefix };
}

async function bootstrap() {
  config();
  const { NestFactory } = await import('@nestjs/core');
  const { AppModule } = await import('./app.module');
  const app = await NestFactory.create(AppModule);
  const { port, host, globalPrefix } = setupServer();
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  await app.listen(port, host, () => {
    Logger.log(`Nest App listening at http://${host}:${port}/${globalPrefix}`);
  });
}
bootstrap();

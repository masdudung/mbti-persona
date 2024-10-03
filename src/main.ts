import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT;
  await app.listen(port);

  // Get the address information
  const address = app.getHttpServer().address();

  // Log the IP address and port
  const ip = address.address === '::' ? 'localhost' : address.address; // Handle IPv6
  console.log(`Nest application is running at http://${ip}:${port}`);
}
bootstrap();

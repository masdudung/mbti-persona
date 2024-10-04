import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // modify header and enable cors
  app.use(helmet());
  app.enableCors({
    origin: ['https://example.com', 'https://another-domain.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // actiivate global validation for cotroller
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // only valid property in DTO will processed
      forbidNonWhitelisted: true, // denny invalid request
      transform: true, // transform data as DTO
    }),
  );

  const port = process.env.APP_PORT;
  await app.listen(port);

  // Get the address information
  const address = app.getHttpServer().address();

  // Log the IP address and port
  const ip = address.address === '::' ? 'localhost' : address.address; // Handle IPv6
  console.log(`Nest application is running at http://${ip}:${port}`);
}
bootstrap();

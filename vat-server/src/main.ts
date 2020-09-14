import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const microserviceOption = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 3333
  }
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOption);
  await app.listen(() => { console.log('Microservice wartet ...') });
}
bootstrap();

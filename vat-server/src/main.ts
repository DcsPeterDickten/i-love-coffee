import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const microserviceOption = {
  transport: Transport.REDIS,
  options: {
    url: 'redis://localhost:6379'
  }
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOption);
  await app.listen(() => { console.log('Microservice wartet ...') });
}
bootstrap();

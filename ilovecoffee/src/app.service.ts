import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  }
  getHello(): string {
    return 'Hello workshop!';
  }
}

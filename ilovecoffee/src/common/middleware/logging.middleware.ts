import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('LoggingMiddleware - timing');
    res.on('finish', () => console.timeEnd('LoggingMiddleware - timing'));
    next(); // wichtig
  }
}

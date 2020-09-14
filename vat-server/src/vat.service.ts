import { Injectable } from '@nestjs/common';

@Injectable()
export class VatService {
  calculate(price: number): number {
    return Math.round(price * 1.16);
  }
}

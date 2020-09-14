import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { VatService } from './vat.service';

@Controller()
export class AppController {
  constructor(private readonly vatService: VatService) { }

  @MessagePattern('vat')
  calc(price: number): number {
    return this.vatService.calculate(price);
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { VatService } from './vat.service';

@Controller()
export class AppController {

  constructor(private vatService: VatService) { }

  @Get(':price')
  calc(@Param('price') price: string): Observable<number> {
    return this.vatService.calc(+price);
  }
}

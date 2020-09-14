import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VatService } from './vat.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [VatService],
})
export class AppModule { }

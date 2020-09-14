import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class VatService {
    private client: ClientProxy;
    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                url: 'redis://localhost:6379'
            }
        });
    }
    calc(price: number): Observable<number> {
        return this.client.send<number, number>('vat', price);
    }
}
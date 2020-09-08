import { Module, Injectable } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

async function getData(connection: Connection): Promise<string[]> {
    return await Promise.resolve(['Starbucks', 'Tchibo']);
}

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        {
            provide: COFFEE_BRANDS,
            useFactory: getData,
            inject: [Connection]
        }
    ],
    exports: [CoffeesService]
})
export class CoffeesModule { }

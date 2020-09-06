import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { MockCoffeesService } from './mock-coffees.service';
import { COFFEE_BRANDS } from './coffee.constants';


class ConfigService { }
class DevelopmentConfigService { }
class ProductionConfigService { }

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController],
    providers: [
        { provide: CoffeesService, useValue: new MockCoffeesService() },
        { provide: COFFEE_BRANDS, useValue: ['Starbucks', 'TCHIBO'] },
        {
            provide: ConfigService, useClass:
                process.env.NODE_END === 'development' ?
                    DevelopmentConfigService :
                    ProductionConfigService
        },



    ],
    exports: [CoffeesService]
})
export class CoffeesModule { }

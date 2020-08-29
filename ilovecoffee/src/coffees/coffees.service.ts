import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'Blond Espresso Roast',
            brand: 'Starbucks',
            flavors: ['sweet', 'nuts']
        }
    ];

    findAll(): Coffee[] {
        return this.coffees;
    }

    findOne(id: number): Coffee {
        return this.coffees.find(c => c.id === id);
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
    }

    update(id: number, updateCoffeeDto: any) {
        const existing = this.findOne(id);
        if (existing) {
            this.remove(id);
            this.coffees.push({ ...existing, ...updateCoffeeDto });
        }
    }

    remove(id: number) {
        this.coffees = this.coffees.filter(c => c.id !== id);
    }
}

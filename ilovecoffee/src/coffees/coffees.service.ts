import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import * as fs from 'fs';
import * as path from 'path';
const REL_PATH_TO_COFFEE_DATA = '../../Coffees.json';

@Injectable()
export class CoffeesService {

    findAll(): Coffee[] {
        return this.readData();
    }

    findOne(id: string): Coffee {
        return this.readData().find(c => c.id === +id);
    }

    create(createCoffeeDto: any) {
        const id = Math.round(10000000 * Math.random());
        const newCoffee = { id, ...createCoffeeDto }
        const coffees = this.readData();
        coffees.push(newCoffee);
        this.writeData(coffees);
    }

    update(id: string, updateCoffeeDto: any) {
        const existing = this.findOne(id);
        if (existing) {
            this.remove(id);
            const coffees = this.readData();
            coffees.push({ ...existing, ...updateCoffeeDto });
            this.writeData(coffees);
        }
    }

    remove(id: string) {
        const coffees = this.readData();
        this.writeData(coffees.filter(c => c.id !== +id));
    }

    // ----------------------------------------------------------
    // ----------------------------------------------------------

    getAbsolutePathTo(): string {
        return path.resolve(__dirname, REL_PATH_TO_COFFEE_DATA);
    }

    doesFileExist(): boolean {
        return fs.existsSync(this.getAbsolutePathTo());
    }

    readData(): Array<any> {
        if (!this.doesFileExist()) {
            this.writeData([]);
        }
        const result = fs.readFileSync(this.getAbsolutePathTo(), 'utf8')
        return JSON.parse(result);
    }

    writeData(data: Array<any>) {
        fs.writeFileSync(this.getAbsolutePathTo(), JSON.stringify(data), 'utf8')
    }
} 
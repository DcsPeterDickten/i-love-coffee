import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { runInThisContext } from 'vm';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ) {

    }

    findAll() {
        return this.coffeeRepository.find();
    }

    async findOne(id: number) {
        const coffee = await this.coffeeRepository.findOne(id);
        if (!coffee) {
            throw new NotFoundException(`Kaffee mit id ${id} wurde nicht gefunden`);
        }
        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        const coffee = this.coffeeRepository.create(createCoffeeDto);
        this.coffeeRepository.save(coffee);
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
        const coffee = await this.coffeeRepository.preload({
            id: +id, ...updateCoffeeDto
        });
        if (!coffee) {
            throw new NotFoundException(`Kaffee mit id ${id} wurde nicht gefunden`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: number) {
        const coffee = await this.coffeeRepository.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }
}

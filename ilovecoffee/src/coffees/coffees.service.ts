import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,

        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>
    ) { }

    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        return this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit
        });
    }

    async findOne(id: number) {
        const coffee = await this.coffeeRepository.findOne(id, { relations: ['flavors'] });
        if (!coffee) {
            throw new NotFoundException(`Kaffee mit id ${id} wurde nicht gefunden`);
        }
        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {

        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(
                flavor => this.preloadFlavor(flavor)
            )
        );

        const coffee = this.coffeeRepository.create({ ...createCoffeeDto, flavors });
        this.coffeeRepository.save(coffee);
    }

    async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {

        const flavors = updateCoffeeDto.flavors && (await Promise.all(
            updateCoffeeDto.flavors.map(
                flavor => this.preloadFlavor(flavor)
            )
        ));

        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
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

    async preloadFlavor(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ name });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }
}

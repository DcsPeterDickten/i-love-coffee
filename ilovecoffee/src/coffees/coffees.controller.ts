import { Controller, Get, Param, Post, Body, Patch, Delete, Query, NotFoundException } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeeService: CoffeesService) { }

    @Get('')
    findAll(@Query() paginationQuery): any {
        // const { limit, offset } = paginationQuery; // später
        return this.coffeeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): any {
        // throw new Error('Bumm!');
        const coffee = this.coffeeService.findOne(id);
        if (!coffee) {
            throw new NotFoundException(`Kaffee Nr. ${id} nicht gefunden`);
        }
        return coffee;
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeeService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        console.log({ updateCoffeeDto });
        return this.coffeeService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.coffeeService.remove(id);
    }
}

import { Controller, Get, Param, Post, Body, Patch, Delete, Query, NotFoundException, SetMetadata } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeeService: CoffeesService) { }

    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Get('')
    @Public()
    findAll(@Query() paginationQuery: PaginationQueryDto): any {
        return this.coffeeService.findAll(paginationQuery);
    }

    @Get(':id')
    @Public()
    findOne(@Param('id', ParseIntPipe) id: number): any {
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

    @Post('recommend/:id')
    async recommend(@Param('id') id: number) {

        const coffee = await this.coffeeService.findOne(id);
        if (!coffee) {
            throw new NotFoundException(`Kaffee Nr. ${id} nicht gefunden`);
        }

        return this.coffeeService.recommendCoffee(coffee);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeeService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.coffeeService.remove(id);
    }
}

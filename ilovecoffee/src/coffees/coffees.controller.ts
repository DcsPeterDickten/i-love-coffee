import { Controller, Get, Param, Post, Body } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

    @Get('')
    findAll(): any {
        return '... wird alle Kaffeesorten liefern.';
    }

    @Get(':id')
    findOne(@Param('id') id: string): any {
        return `... wird die Kaffeesorte für die ID ${id} liefern.`;
    }

    @Post()
    create(@Body() body) {
        return body;
    }

}

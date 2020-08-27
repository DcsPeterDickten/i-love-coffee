import { Controller, Get, Param, Post, Body, Patch, Delete, Query } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

    @Get('')
    findAll(@Query() paginationQuery): any {
        const { limit, offset } = paginationQuery;
        return `Kaffeesorten - limit= ${limit}, offset= ${offset}`;
    }

    @Get(':id')
    findOne(@Param('id') id: string): any {
        return `... wird die Kaffeesorte für die ID ${id} liefern.`;
    }

    @Post()
    create(@Body() body) {
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        console.log({ body });
        return `Die Kaffeesorte mit der ID ${id} wird aktualisiert.`;
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return `Die Kaffeesorte mit der ID ${id} wird gelöscht.`;
    }

}

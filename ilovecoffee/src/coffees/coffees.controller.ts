import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';

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

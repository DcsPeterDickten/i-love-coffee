import { Controller, Get, Param, Post, Body, HttpCode, HttpStatus, Res } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

    @Get('')
    findAll(@Res() response): any {
        response.status(200).send('... wird alle Kaffeesorten liefern.');
    }

    @Get(':id')
    findOne(@Param('id') id: string): any {
        return `... wird die Kaffeesorte für die ID ${id} liefern.`;
    }

    @Post()
    @HttpCode(HttpStatus.GONE)  // liefert IMMER 410
    create(@Body() body) {
        return body;
    }

}

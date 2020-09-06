import { Injectable } from '@nestjs/common';

@Injectable()
export class MockCoffeesService {

    constructor() {
        console.log('Hello world from MockCoffeesService');
    }


}

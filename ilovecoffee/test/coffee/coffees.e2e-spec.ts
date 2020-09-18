import { Test, TestingModule } from '@nestjs/testing';
import { HttpServer, HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';

describe('CoffeeController (e2e)', () => {
  let app: INestApplication;

  const coffee = {
    name: 'Peters favorite Coffee',
    brand: 'Starbucks',
    flavors: ['sweet', 'vanilla']
  };

  const expectedCoffee = jasmine.objectContaining({
    ...coffee,
    flavors: jasmine.arrayContaining(
      coffee.flavors.map(name => jasmine.objectContaining({ name }))
    )
  });

  let httpServer: HttpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true
        })],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    }));

    await app.init();
    httpServer = app.getHttpServer();
  });

  it('Erstellen POST /', () => {
    return request(httpServer)
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => { expect(body).toEqual(expectedCoffee); })
  });

  it('Alle lesen GET /', () => {
    return request(httpServer)
      .get('/coffees')
      .then(({ body }) => {
        console.log(body)
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toEqual(expectedCoffee);
      });
  });

  it('Einen lesen GET /:id', () => {
    return request(httpServer)
      .get('/coffees/1')
      .then(({ body }) => {
        expect(body).toEqual(expectedCoffee);
      });
  });

  it('Einen ändern PATCH /:id', () => {
    const updateCoffeeDto: UpdateCoffeeDto = {
      ...coffee,
      name: 'Vanilla Roast'
    }
    return request(httpServer)
      .patch('/coffees/1')
      .send(updateCoffeeDto)
      .then(({ body }) => {
        expect(body.name).toEqual(updateCoffeeDto.name);

        return request(httpServer)
          .get('/coffees/1')
          .then(({ body }) => {
            expect(body.name).toEqual(updateCoffeeDto.name);
          });
      });
  });

  it('Einen löschen DELETE /:id', () => {
    return request(httpServer)
      .delete('/coffees/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(httpServer)
          .get('/coffees/1')
          .expect(HttpStatus.NOT_FOUND);
      })
  });

  afterAll(async () => {
    await app.close();
  })

});

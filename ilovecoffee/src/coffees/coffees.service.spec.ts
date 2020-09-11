import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn()
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: createMockRepository() },
        { provide: getRepositoryToken(Coffee), useValue: createMockRepository() }
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {

    it('should return a coffee, when the ID exists', async () => {
      // .. 

      const coffeeId = 1;
      const expectedCoffee = {};
      coffeeRepository.findOne.mockReturnValue(expectedCoffee);

      const coffee = await service.findOne(coffeeId);
      expect(coffee).toEqual(expectedCoffee);
    });

    it('should throw an Error, when the ID does not exist ', async () => {
      const coffeeId = 1;
      coffeeRepository.findOne.mockReturnValue(undefined);

      try {
        await service.findOne(coffeeId);
      }
      catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    });

  });
})
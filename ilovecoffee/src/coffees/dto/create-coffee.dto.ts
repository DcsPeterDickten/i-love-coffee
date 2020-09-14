import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCoffeeDto {

  @ApiProperty({ description: 'Der Name des Kaffees', example: 'Back from the dead' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'Die Marke des Kaffees', example: 'Starbucks' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ description: 'Die Geschmacksrichtungen' })
  @IsString({ each: true })
  readonly flavors: string[];
}

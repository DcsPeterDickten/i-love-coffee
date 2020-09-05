import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @JoinTable() // Coffee "besitzt" Flavor
    @ManyToMany(type => Flavor, (flavor) => flavor.coffees, { cascade: true })
    flavors: Flavor[];
}
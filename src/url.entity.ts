import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class URL {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    url: string;

    @Column()
    urlHash: string;
}
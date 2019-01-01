import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {Invoice} from './invoice';

@Entity()
export class Transaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    paid: boolean;

    @ManyToOne(type => Invoice, invoice => invoice.transactions)
    invoice: Invoice;
    
}
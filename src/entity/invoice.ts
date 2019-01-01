import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany} from "typeorm";
import {User} from './user';
import { Transaction } from './transaction';


@Entity()
export class Invoice extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    paid: boolean;

    @ManyToOne(type => User, user => user.invoices)
    user: User;

    @OneToMany(type => Transaction, transaction => transaction.invoice)
    transactions: Transaction[]
}
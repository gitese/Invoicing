import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import {Invoice} from './invoice';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string

    @Column()
    company_name: string

    @Column()
    password: string;

    @OneToMany(type => Invoice, invoice => invoice.user)
    invoices: Invoice[];

}
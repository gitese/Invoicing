import { IInvoiceService } from './../interface/IInvoiceService';
import { injectable } from 'inversify';
import {Invoice} from '../../entity';
import { EntityService } from './EntityService';
import {getCustomRepository} from "typeorm";
import {InvoiceRepository} from "../../repository";
import * as bcrypt from 'bcrypt';


@injectable()
export class InvoiceService extends EntityService<Invoice> implements IInvoiceService{

    constructor(){

        const invoiceRepository = getCustomRepository(InvoiceRepository);
        super(invoiceRepository); 
    }
};
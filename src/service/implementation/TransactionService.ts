import { ITransactionService } from './../interface/ITransactionService';
import { injectable } from 'inversify';
import {Transaction} from '../../entity';
import { EntityService } from './EntityService';
import {getCustomRepository} from "typeorm";
import {TransactionRepository} from "../../repository";


@injectable()
export class TransactionService extends EntityService<Transaction> implements ITransactionService{

    constructor(){

        const transactionRepository = getCustomRepository(TransactionRepository);
        super(transactionRepository); 
    }
};
import {EntityRepository,getConnection,Connection} from "typeorm";
import {Transaction} from '../../entity';
import { GenericRepository } from './GenericRepository';


@EntityRepository(Transaction)
export class TransactionRepository extends GenericRepository<Transaction>{

    private readonly _connection: Connection;

    constructor()
    {
        super();
        this._connection = getConnection();
    }
};
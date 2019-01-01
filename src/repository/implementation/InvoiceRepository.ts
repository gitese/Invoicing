import {EntityRepository, Repository,getConnection,Connection} from "typeorm";
import {Invoice} from '../../entity';
import { GenericRepository } from './GenericRepository';


@EntityRepository(Invoice)
export class InvoiceRepository extends GenericRepository<Invoice>{

    private readonly _connection: Connection;

    constructor()
    {
        super();
        this._connection = getConnection();
    }
};
import {EntityRepository, Repository,getConnection,Connection} from "typeorm";
import {User} from '../../entity/user';
import { GenericRepository } from './GenericRepository';


@EntityRepository(User)
export class UserRepository extends GenericRepository<User>{

    private readonly _connection: Connection;

    constructor()
    {
        super();
        this._connection = getConnection();
    }
};
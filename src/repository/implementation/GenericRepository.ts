import { IGenericRepository } from './../interface/IGenericRepository';
import {Repository} from "typeorm";

export abstract class GenericRepository<T> extends Repository<T> implements IGenericRepository<T>{

    public async fetchAll(item?: T): Promise<T[]>{

        const query = (item == null) ? {} : item;
        return await this.find(query);
    }
};
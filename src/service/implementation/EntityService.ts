import {unmanaged, injectable} from 'inversify';
import { IEntityService } from "service/interface/IEntityService";
import {GenericRepository} from '../../repository/implementation/GenericRepository';
import {DeleteResult,UpdateResult} from 'typeorm';


@injectable()
export abstract class EntityService<T> implements IEntityService<T>{

    protected readonly  _repository : GenericRepository<T>;

    constructor(@unmanaged()repository: GenericRepository<T>){
        this._repository = repository;
    }

    public async fetchAll(item?: T): Promise<T[]>{
        return this._repository.fetchAll(item);
    }

    public async findOne(id: string): Promise<T>{
        return this._repository.findOne(id);
    }

    public async create(item: T): Promise<T>{
        let itemToBeInserted: any = item;
        let createdEntity : T = await this._repository.save(itemToBeInserted);
        return createdEntity;
    }

    public async update(id: string, item: T): Promise<boolean>{
        let itemToBeUpdated: any = item;
        let result: UpdateResult = await this._repository.update(id,itemToBeUpdated);
        console.log(result);
        return true;
    }

    public async delete(id: string): Promise<boolean>{
        let result : DeleteResult = await this._repository.delete(id);
        if(result.affected && result.affected == 0)
        {
            throw new Error("An error occurred while deleting an item");
        }
        return true;
    }
}
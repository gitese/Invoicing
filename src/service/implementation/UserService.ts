import { IUserService } from './../interface/IUserService';
import { injectable } from 'inversify';
import {User} from '../../entity/user';
import { EntityService } from './EntityService';
import {getCustomRepository} from "typeorm";
import {UserRepository} from "../../repository";
import * as bcrypt from 'bcrypt';


@injectable()
export class UserService extends EntityService<User> implements IUserService{

    constructor(){

        const userRepository = getCustomRepository(UserRepository);
        super(userRepository); 
    }

    public async createUser(item: User): Promise<User>{
        
        item.password = await this.hashPassword(item.password);
        let createdEntity : User = await this.create(item);
        return createdEntity;
    }


    public async updateUser(id: string,item: User): Promise<any>{

        if(item.password){
            item.password = await this.hashPassword(item.password);
        }
        let status = await this.update(id,item);
        return status;
    }

    private hashPassword(password: string): Promise<string>{

        return new Promise((resolve,reject)=>{
            
            const saltRounds = parseInt(process.env.SALT_ROUNDS);
            
            bcrypt.hash(password,saltRounds,function(err,hash){

                if(hash){
                    
                    resolve(hash);

                }else{
                    
                    reject(err);
                }
            });

        });

        
        
    }
};
import { IRead } from "../../repository/interface/IRead";
import { IWrite } from "../../repository/interface/IWrite";

export interface IEntityService<T> extends IRead<T>,IWrite<T>{
    
};
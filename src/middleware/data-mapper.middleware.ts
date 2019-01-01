import {User,Transaction,Invoice} from '../entity';
import { InvoiceDto,TransactionDto } from '../model';

const convertArrayToObject = (data: Array<string>)=>{

    if(data.length  == 0) return {};
    return data.reduce((acc, key)=>{
        return acc[key] = key
    },{});
};

const mapper = (data: Object, entity: any,excludedProperties:Array<string> = [])=>{

    let mappedExcludedObject = convertArrayToObject(excludedProperties);

    Object.keys(data).forEach((key)=>{

        if(!mappedExcludedObject.hasOwnProperty(key)){
            entity[key] = data[key];
        }
    });
    return entity;
};

const UserDataMapper = {

    requestToEntityMapper : (data: Object)=>{

        let user: User = new User();
        return mapper(data,user);
    }

};


const InvoiceDataMapper = {

    requestToModelDto: (data: Object)=>{
        let invoice: InvoiceDto = new InvoiceDto();
        return mapper(data,invoice);
    },

    modelToEntityMapper : (data: Object)=>{

        let invoice: Invoice = new Invoice();
        let excludedProperties = ["userId"];
        return mapper(data,invoice,excludedProperties);
    }
};

const TransactionDataMapper = {

    requestToModelDto: (data: Object)=>{
        let transaction:  TransactionDto = new TransactionDto();
        return mapper(data,transaction);
    },

    modelToEntityMapper : (data: Object)=>{

        let transaction: Transaction = new Transaction();
        let excludedProperties = ["invoiceId"];
        return mapper(data,transaction,excludedProperties);
    }
};

export {
    UserDataMapper,
    InvoiceDataMapper,
    TransactionDataMapper
}
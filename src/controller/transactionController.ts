import { inject,injectable } from 'inversify';
import { RegistrableController } from "./registrableController";
import { Application, Request, Response, NextFunction } from "express";
import { InvoiceService,TransactionService } from './../service';
import {TYPES} from '../ioc/types';
import routeHandlerMiddleware from '../middleware/route-handler.middleware';
import { Invoice, Transaction } from "../entity";
import {TransactionDto} from '../model';
import {TransactionDataMapper} from '../middleware/data-mapper.middleware';

@injectable()
export class TransactionController implements RegistrableController{

    private readonly _service: TransactionService;
    private readonly _invoiceService: InvoiceService;

    constructor(@inject(TYPES.ITransactionService) transactionService: TransactionService,@inject(TYPES.IInvoiceService) invoiceService: InvoiceService) {
        this._service = transactionService;
        this._invoiceService = invoiceService;
    }

    public register(app: Application): void {

        app.route(`${process.env.ROUTE_PREFIX}/transaction`)
           .get(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

            let entities = await this._service.fetchAll(); 
            res.status(200).json(entities);
       }));


        app.route(`${process.env.ROUTE_PREFIX}/transaction/:id`)
           .get(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let {id} = req.params;
                let entity = await this._service.findOne(id);

                if(entity == null){
                    res.status(404).json({message: "Item does not exist"});

                }else{
                    res.status(200).json(entity);
                }
       }));


        app.route(`${process.env.ROUTE_PREFIX}/transaction`)
           .post(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let model: TransactionDto = TransactionDataMapper.requestToModelDto(req.body);
                let invoice: Invoice = await this._invoiceService.findOne(model.invoiceId);
                let transaction: Transaction = TransactionDataMapper.modelToEntityMapper(req.body);
                transaction.invoice = invoice;
                let savedTransaction = await this._service.create(transaction);
                res.status(201).json(savedTransaction);
       }));

        app.route(`${process.env.ROUTE_PREFIX}/transaction/:id`)
           .put(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let {id} = req.params;
                let model: TransactionDto = TransactionDataMapper.requestToModelDto(req.body);
                let invoice: Invoice = await this._invoiceService.findOne(model.invoiceId);
                let transaction: Transaction = TransactionDataMapper.modelToEntityMapper(req.body);
                transaction.invoice = invoice;
                let status = await this._service.update(id,transaction);
                res.status(204).json({message: "Item updated successfully"});
            }));

       app.route(`${process.env.ROUTE_PREFIX}/transaction/:id`)
           .delete(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let {id} = req.params;
                let status = await this._service.delete(id);
                res.status(200).json({message: "Item deleted successfully"});
       }));
    };
};
import { inject,injectable } from 'inversify';
import { RegistrableController } from "./registrableController";
import { Application, Request, Response, NextFunction } from "express";
import { InvoiceService,UserService } from './../service';
import {TYPES} from '../ioc/types';
import routeHandlerMiddleware from '../middleware/route-handler.middleware';
import { Invoice, User } from "../entity";
import {InvoiceDto} from '../model';
import {InvoiceDataMapper} from '../middleware/data-mapper.middleware';

@injectable()
export class InvoiceController implements RegistrableController{

    private readonly _service: InvoiceService;
    private readonly _userService: UserService;

    constructor(@inject(TYPES.IInvoiceService) invoiceService: InvoiceService, @inject(TYPES.IUserService) userService: UserService) {
        this._service = invoiceService;
        this._userService = userService;
    }

    public register(app: Application): void {

        app.route(`${process.env.ROUTE_PREFIX}/invoice`)
           .get(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

            let entities = await this._service.fetchAll(); 
            res.status(200).json(entities);
       }));


        app.route(`${process.env.ROUTE_PREFIX}/invoice/:id`)
           .get(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let {id} = req.params;
                let entity = await this._service.findOne(id);

                if(entity == null){
                    res.status(404).json({message: "Item does not exist"});

                }else{
                    res.status(200).json(entity);
                }
       }));


        app.route(`${process.env.ROUTE_PREFIX}/invoice`)
           .post(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let model: InvoiceDto = InvoiceDataMapper.requestToModelDto(req.body);
                let user: User = await this._userService.findOne(model.userId);
                let invoice: Invoice = InvoiceDataMapper.modelToEntityMapper(req.body);
                invoice.user = user;
                let savedInvoice = await this._service.create(invoice);
                res.status(201).json(savedInvoice);
       }));

        app.route(`${process.env.ROUTE_PREFIX}/invoice/:id`)
           .put(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let {id} = req.params;
                let model: InvoiceDto = InvoiceDataMapper.requestToModelDto(req.body);
                let invoice: Invoice = InvoiceDataMapper.modelToEntityMapper(req.body);
                let user: User = await this._userService.findOne(model.userId);
                invoice.user = user;
                let status = await this._service.update(id,invoice);
                res.status(204).json({message: "Item updated successfully"});
            }));

       app.route(`${process.env.ROUTE_PREFIX}/invoice/:id`)
           .delete(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let {id} = req.params;
                let status = await this._service.delete(id);
                res.status(200).json({message: "Item deleted successfully"});
       }));
    };
};
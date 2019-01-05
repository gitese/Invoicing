import { inject,injectable } from 'inversify';
import { RegistrableController } from "./registrableController";
import { Application, Request, Response, NextFunction } from "express";
import { UserService } from './../service';
import {TYPES} from '../ioc/types';
import routeHandlerMiddleware from '../middleware/route-handler.middleware';
import { User } from "../entity";
import {UserDataMapper} from '../middleware/data-mapper.middleware';

@injectable()
export class UserController implements RegistrableController{

    private readonly _userService: UserService;

    constructor(@inject(TYPES.IUserService) userService: UserService) {
        this._userService = userService;
    }

    public register(app: Application): void {

        app.route(`${process.env.ROUTE_PREFIX}/user`)
           .get(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

            let users = await this._userService.fetchAll(); 
            res.status(200).json(users);
       }));
       
        app.route(`${process.env.ROUTE_PREFIX}/user/:id`)
           .get(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let {id} = req.params;
                let user = await this._userService.findOne(id);

                if(user == null){
                    res.status(404).json({message: "Item does not exist"});

                }else{
                    res.status(200).json(user);
                }
       }));


        app.route(`${process.env.ROUTE_PREFIX}/user`)
           .post(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let user: User = UserDataMapper.requestToEntityMapper(req.body);
                let newUser = await this._userService.createUser(user);
                res.status(201).json(newUser);
       }));

        app.route(`${process.env.ROUTE_PREFIX}/user/:id`)
           .put(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let {id} = req.params;
                let user: User = UserDataMapper.requestToEntityMapper(req.body);
                let status: boolean = await this._userService.updateUser(id,user);
                res.status(204).json({message: "Item updated successfully"});
       }));

       app.route(`${process.env.ROUTE_PREFIX}/user/:id`)
           .delete(routeHandlerMiddleware(async(req: Request, res: Response, next: NextFunction)=>{

                let {id} = req.params;
                let status = await this._userService.delete(id);
                res.status(200).json({message: "Item deleted successfully"});
       }));
    };
};
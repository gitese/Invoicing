import { RegistrableController,UserController,InvoiceController } from './../controller';
import {Container} from 'inversify';
import {TYPES} from './types';
import {IUserService,UserService,IInvoiceService,InvoiceService} from '../service';


const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<RegistrableController>(TYPES.Controller).to(InvoiceController);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IInvoiceService>(TYPES.IInvoiceService).to(InvoiceService);

export default container;
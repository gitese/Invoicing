import { RegistrableController,UserController,InvoiceController, TransactionController } from './../controller';
import {Container} from 'inversify';
import {TYPES} from './types';
import {IUserService,UserService,IInvoiceService,InvoiceService,ITransactionService,TransactionService} from '../service';


const container = new Container();
container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<RegistrableController>(TYPES.Controller).to(InvoiceController);
container.bind<RegistrableController>(TYPES.Controller).to(TransactionController);
container.bind<IUserService>(TYPES.IUserService).to(UserService);
container.bind<IInvoiceService>(TYPES.IInvoiceService).to(InvoiceService);
container.bind<ITransactionService>(TYPES.ITransactionService).to(TransactionService);

export default container;

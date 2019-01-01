import "reflect-metadata";
global.Promise = require("bluebird");
require('dotenv').config();
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import {TYPES} from './ioc/types';
import container from './ioc/inversify.config';

//import {logger} from './util/Logger';
import {RegistrableController} from './controller';


createConnection().then(async (connection)=>{

    // create express application
    const app: express.Application = await express();
    // let express support JSON bodies
    app.use(bodyParser.json()); //for parsing application/json
    app.use(bodyParser.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded

    // setup express middleware logging and error handling
    app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
        
        next(err);
    });

    app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
        
        console.log("Error in Application");
        console.log(err.message);
        res.status(500).send('Internal Server Error');
    });

    app.listen(process.env.HOSTING_PORT, function () {
        //logger.info('Example app listening on port 3000!');
    });

    // grabs the Controller from IoC container and registers all the endpoints
    const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
    controllers.forEach(controller => controller.register(app));

})
.catch((err)=>{
    console.log("Error in database connection");
    console.log(err.message);
});

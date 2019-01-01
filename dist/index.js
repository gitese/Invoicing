"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const typeorm_1 = require("typeorm");
const types_1 = require("./ioc/types");
const inversify_config_1 = require("./ioc/inversify.config");
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
    // create express application
    const app = yield express();
    // let express support JSON bodies
    app.use(bodyParser.json());
    // setup express middleware logging and error handling
    app.use(function (err, req, res, next) {
        //logger.error(err.stack);
        next(err);
    });
    app.use(function (err, req, res, next) {
        res.status(500).send('Internal Server Error');
    });
    app.listen(process.env.HOSTING_PORT, function () {
        //logger.info('Example app listening on port 3000!');
    });
    // grabs the Controller from IoC container and registers all the endpoints
    const controllers = inversify_config_1.default.getAll(types_1.TYPES.Controller);
    controllers.forEach(controller => controller.register(app));
}))
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map
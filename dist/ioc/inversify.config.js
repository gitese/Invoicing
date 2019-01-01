"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./../controller");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const service_1 = require("../service");
const container = new inversify_1.Container();
container.bind(types_1.TYPES.Controller).to(controller_1.UserController);
container.bind(types_1.TYPES.IUserService).to(service_1.UserService);
exports.default = container;
//# sourceMappingURL=inversify.config.js.map
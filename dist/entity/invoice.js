"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const transaction_1 = require("./transaction");
let Invoice = class Invoice extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Invoice.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Invoice.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Invoice.prototype, "paid", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_1.User, user => user.invoices),
    __metadata("design:type", user_1.User)
], Invoice.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => transaction_1.Transaction, transaction => transaction.invoice),
    __metadata("design:type", Array)
], Invoice.prototype, "transactions", void 0);
Invoice = __decorate([
    typeorm_1.Entity()
], Invoice);
exports.Invoice = Invoice;
//# sourceMappingURL=invoice.js.map
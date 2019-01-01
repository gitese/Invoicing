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
class InitialMigration1546183589831 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `company_name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `transaction` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `paid` tinyint NOT NULL, `invoiceId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `invoice` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `paid` tinyint NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_17b930b7e4c1e8175fcb5ebca4b` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`)");
            yield queryRunner.query("ALTER TABLE `invoice` ADD CONSTRAINT `FK_f8e849201da83b87f78c7497dde` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("ALTER TABLE `invoice` DROP FOREIGN KEY `FK_f8e849201da83b87f78c7497dde`");
            yield queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_17b930b7e4c1e8175fcb5ebca4b`");
            yield queryRunner.query("DROP TABLE `invoice`");
            yield queryRunner.query("DROP TABLE `transaction`");
            yield queryRunner.query("DROP TABLE `user`");
        });
    }
}
exports.InitialMigration1546183589831 = InitialMigration1546183589831;
//# sourceMappingURL=1546183589831-Initial_Migration.js.map
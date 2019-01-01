import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1546183589831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `company_name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `transaction` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `paid` tinyint NOT NULL, `invoiceId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `invoice` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `paid` tinyint NOT NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `transaction` ADD CONSTRAINT `FK_17b930b7e4c1e8175fcb5ebca4b` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`)");
        await queryRunner.query("ALTER TABLE `invoice` ADD CONSTRAINT `FK_f8e849201da83b87f78c7497dde` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `invoice` DROP FOREIGN KEY `FK_f8e849201da83b87f78c7497dde`");
        await queryRunner.query("ALTER TABLE `transaction` DROP FOREIGN KEY `FK_17b930b7e4c1e8175fcb5ebca4b`");
        await queryRunner.query("DROP TABLE `invoice`");
        await queryRunner.query("DROP TABLE `transaction`");
        await queryRunner.query("DROP TABLE `user`");
    }

}

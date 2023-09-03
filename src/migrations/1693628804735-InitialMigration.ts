import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1693628804735 implements MigrationInterface {
    name = 'InitialMigration1693628804735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "price"`);
    }

}

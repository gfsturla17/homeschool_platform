import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedRoles1717042081667 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      INSERT INTO role (name) VALUES ('Teacher'), ('Admin'), ('Parent');
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DELETE FROM role WHERE name IN ('Teacher', 'Admin', 'Parent');
    `);
    }

}

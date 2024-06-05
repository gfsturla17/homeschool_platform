import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueEmailContstraintToTeacher1715830646972 implements MigrationInterface {
    name = 'AddUniqueEmailContstraintToTeacher1715830646972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ADD CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" DROP CONSTRAINT "UQ_00634394dce7677d531749ed8e8"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Teacher1715754526288 implements MigrationInterface {
    name = 'Teacher1715754526288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dbo"."teacher" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "yearsOfExperience" integer NOT NULL, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."teacher_login_credentials" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "teacherId" integer NOT NULL, CONSTRAINT "REL_90a2339b02b15701560e4d1e63" UNIQUE ("teacherId"), CONSTRAINT "PK_dde80be804bed33599f6d9be89d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."teacher_availability" ("id" SERIAL NOT NULL, "dayOfWeek" character varying NOT NULL, "startTime" character varying NOT NULL, "endTime" character varying NOT NULL, "teacherId" integer NOT NULL, CONSTRAINT "PK_5c0e7ed5bd73803468a56817e21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."parent_entity" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_ab7017bfc43e55d226ec1d84132" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_login_credentials" ADD CONSTRAINT "FK_90a2339b02b15701560e4d1e63a" FOREIGN KEY ("teacherId") REFERENCES "dbo"."teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD CONSTRAINT "FK_cce9f59a61026ed4325b9fc3ffe" FOREIGN KEY ("teacherId") REFERENCES "dbo"."teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP CONSTRAINT "FK_cce9f59a61026ed4325b9fc3ffe"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_login_credentials" DROP CONSTRAINT "FK_90a2339b02b15701560e4d1e63a"`);
        await queryRunner.query(`DROP TABLE "dbo"."parent_entity"`);
        await queryRunner.query(`DROP TABLE "dbo"."teacher_availability"`);
        await queryRunner.query(`DROP TABLE "dbo"."teacher_login_credentials"`);
        await queryRunner.query(`DROP TABLE "dbo"."teacher"`);
    }

}

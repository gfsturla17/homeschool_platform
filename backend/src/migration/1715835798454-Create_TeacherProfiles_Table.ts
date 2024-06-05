import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTeacherProfilesTable1715835798454 implements MigrationInterface {
    name = 'CreateTeacherProfilesTable1715835798454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dbo"."teacher_profile" ("id" SERIAL NOT NULL, "biography" character varying NOT NULL, "profilePictureUrl" character varying NOT NULL, "socialMediaLinks" character varying NOT NULL, "teacherId" integer, CONSTRAINT "REL_6af1b50cd70874585cac3e894b" UNIQUE ("teacherId"), CONSTRAINT "PK_c1503c06e087bf013daf42f1719" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ADD CONSTRAINT "FK_6af1b50cd70874585cac3e894b0" FOREIGN KEY ("teacherId") REFERENCES "dbo"."teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" DROP CONSTRAINT "FK_6af1b50cd70874585cac3e894b0"`);
        await queryRunner.query(`DROP TABLE "dbo"."teacher_profile"`);
    }

}

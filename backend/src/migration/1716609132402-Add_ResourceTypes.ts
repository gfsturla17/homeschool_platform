import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResourceTypes1716609132402 implements MigrationInterface {
    name = 'AddResourceTypes1716609132402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" DROP CONSTRAINT "FK_6af1b50cd70874585cac3e894b0"`);
        await queryRunner.query(`CREATE TABLE "dbo"."resource_type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "UQ_80bcc8c65fbd9e83a52b7e0a94e" UNIQUE ("type"), CONSTRAINT "PK_a7ce3257b16bbb1372e2f6424f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."resource" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "file" character varying, "resource_type_id" integer, "teacher_id" integer, CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" DROP COLUMN "yearsOfExperience"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" DROP COLUMN "socialMediaLinks"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ADD "state" character varying`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ADD "tiktokLink" character varying`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ADD "twitterLink" character varying`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ADD "facebookLink" character varying`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ADD "instagramLink" character varying`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ALTER COLUMN "firstName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ALTER COLUMN "lastName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ALTER COLUMN "biography" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ALTER COLUMN "profilePictureUrl" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ADD CONSTRAINT "FK_6af1b50cd70874585cac3e894b0" FOREIGN KEY ("teacherId") REFERENCES "dbo"."teacher"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."resource" ADD CONSTRAINT "FK_d8d95de2b694aeba55554428f38" FOREIGN KEY ("resource_type_id") REFERENCES "dbo"."resource_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."resource" ADD CONSTRAINT "FK_a807eefd403d43e3cd504e3149c" FOREIGN KEY ("teacher_id") REFERENCES "dbo"."teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."resource" DROP CONSTRAINT "FK_a807eefd403d43e3cd504e3149c"`);
        await queryRunner.query(`ALTER TABLE "dbo"."resource" DROP CONSTRAINT "FK_d8d95de2b694aeba55554428f38"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" DROP CONSTRAINT "FK_6af1b50cd70874585cac3e894b0"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ALTER COLUMN "profilePictureUrl" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ALTER COLUMN "biography" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ALTER COLUMN "lastName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ALTER COLUMN "firstName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" DROP COLUMN "instagramLink"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" DROP COLUMN "facebookLink"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" DROP COLUMN "twitterLink"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" DROP COLUMN "tiktokLink"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ADD "socialMediaLinks" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ADD "yearsOfExperience" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "dbo"."resource"`);
        await queryRunner.query(`DROP TABLE "dbo"."resource_type"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_profile" ADD CONSTRAINT "FK_6af1b50cd70874585cac3e894b0" FOREIGN KEY ("teacherId") REFERENCES "dbo"."teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

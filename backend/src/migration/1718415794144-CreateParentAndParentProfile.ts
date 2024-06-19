import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateParentAndParentProfile1718415794144 implements MigrationInterface {
    name = 'CreateParentAndParentProfile1718415794144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dbo"."address" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."teacher_availability_exception" ("id" SERIAL NOT NULL, "exceptionDate" TIMESTAMP NOT NULL, "availabilityId" integer, CONSTRAINT "PK_fb27ce2994dfacbb174e96f12bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."parent" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_a51bd21a6e90dbe656ad65cab8" UNIQUE ("userId"), CONSTRAINT "PK_bf93c41ee1ae1649869ebd05617" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."parent_profile" ("id" SERIAL NOT NULL, "address" character varying, "city" character varying, "state" character varying, "biography" character varying, "profilePictureUrl" character varying, "parentId" integer, CONSTRAINT "REL_bd7020daa104ad956e08bd58d4" UNIQUE ("parentId"), CONSTRAINT "PK_a31432e99716abe290bd3f6c34a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "dayOfWeek"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "startTime"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "dbo"."user" ADD "addressId" integer`);
        await queryRunner.query(`ALTER TABLE "dbo"."user" ADD CONSTRAINT "UQ_217ba147c5de6c107f2fa7fa271" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "startDateTime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "endDateTime" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "repeatFrequency" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "repeatUntil" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP CONSTRAINT "FK_cce9f59a61026ed4325b9fc3ffe"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ALTER COLUMN "teacherId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "dbo"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability_exception" ADD CONSTRAINT "FK_a7e6db55cd55233db0c659d377e" FOREIGN KEY ("availabilityId") REFERENCES "dbo"."teacher_availability"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD CONSTRAINT "FK_cce9f59a61026ed4325b9fc3ffe" FOREIGN KEY ("teacherId") REFERENCES "dbo"."teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent" ADD CONSTRAINT "FK_a51bd21a6e90dbe656ad65cab89" FOREIGN KEY ("userId") REFERENCES "dbo"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent_profile" ADD CONSTRAINT "FK_bd7020daa104ad956e08bd58d4c" FOREIGN KEY ("parentId") REFERENCES "dbo"."parent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."parent_profile" DROP CONSTRAINT "FK_bd7020daa104ad956e08bd58d4c"`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent" DROP CONSTRAINT "FK_a51bd21a6e90dbe656ad65cab89"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP CONSTRAINT "FK_cce9f59a61026ed4325b9fc3ffe"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability_exception" DROP CONSTRAINT "FK_a7e6db55cd55233db0c659d377e"`);
        await queryRunner.query(`ALTER TABLE "dbo"."user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ALTER COLUMN "teacherId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD CONSTRAINT "FK_cce9f59a61026ed4325b9fc3ffe" FOREIGN KEY ("teacherId") REFERENCES "dbo"."teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "repeatUntil"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "repeatFrequency"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "endDateTime"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "startDateTime"`);
        await queryRunner.query(`ALTER TABLE "dbo"."user" DROP CONSTRAINT "UQ_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "dbo"."user" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "endTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "startTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "dayOfWeek" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "dbo"."parent_profile"`);
        await queryRunner.query(`DROP TABLE "dbo"."parent"`);
        await queryRunner.query(`DROP TABLE "dbo"."teacher_availability_exception"`);
        await queryRunner.query(`DROP TABLE "dbo"."address"`);
    }

}

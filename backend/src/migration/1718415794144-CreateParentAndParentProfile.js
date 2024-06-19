"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateParentAndParentProfile1718415794144 = void 0;
class CreateParentAndParentProfile1718415794144 {
    constructor() {
        this.name = 'CreateParentAndParentProfile1718415794144';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "dbo"."address" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "dbo"."teacher_availability_exception" ("id" SERIAL NOT NULL, "exceptionDate" TIMESTAMP NOT NULL, "availabilityId" integer, CONSTRAINT "PK_fb27ce2994dfacbb174e96f12bb" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "dbo"."parent" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_a51bd21a6e90dbe656ad65cab8" UNIQUE ("userId"), CONSTRAINT "PK_bf93c41ee1ae1649869ebd05617" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "dbo"."parent_profile" ("id" SERIAL NOT NULL, "address" character varying, "city" character varying, "state" character varying, "biography" character varying, "profilePictureUrl" character varying, "parentId" integer, CONSTRAINT "REL_bd7020daa104ad956e08bd58d4" UNIQUE ("parentId"), CONSTRAINT "PK_a31432e99716abe290bd3f6c34a" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "dayOfWeek"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "startTime"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "endTime"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."user" ADD "addressId" integer`);
            yield queryRunner.query(`ALTER TABLE "dbo"."user" ADD CONSTRAINT "UQ_217ba147c5de6c107f2fa7fa271" UNIQUE ("addressId")`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "startDateTime" TIMESTAMP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "endDateTime" TIMESTAMP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "repeatFrequency" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "repeatUntil" TIMESTAMP`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP CONSTRAINT "FK_cce9f59a61026ed4325b9fc3ffe"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ALTER COLUMN "teacherId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "dbo"."user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "dbo"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability_exception" ADD CONSTRAINT "FK_a7e6db55cd55233db0c659d377e" FOREIGN KEY ("availabilityId") REFERENCES "dbo"."teacher_availability"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD CONSTRAINT "FK_cce9f59a61026ed4325b9fc3ffe" FOREIGN KEY ("teacherId") REFERENCES "dbo"."teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "dbo"."parent" ADD CONSTRAINT "FK_a51bd21a6e90dbe656ad65cab89" FOREIGN KEY ("userId") REFERENCES "dbo"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "dbo"."parent_profile" ADD CONSTRAINT "FK_bd7020daa104ad956e08bd58d4c" FOREIGN KEY ("parentId") REFERENCES "dbo"."parent"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "dbo"."parent_profile" DROP CONSTRAINT "FK_bd7020daa104ad956e08bd58d4c"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."parent" DROP CONSTRAINT "FK_a51bd21a6e90dbe656ad65cab89"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP CONSTRAINT "FK_cce9f59a61026ed4325b9fc3ffe"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability_exception" DROP CONSTRAINT "FK_a7e6db55cd55233db0c659d377e"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ALTER COLUMN "teacherId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD CONSTRAINT "FK_cce9f59a61026ed4325b9fc3ffe" FOREIGN KEY ("teacherId") REFERENCES "dbo"."teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "repeatUntil"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "repeatFrequency"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "endDateTime"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" DROP COLUMN "startDateTime"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."user" DROP CONSTRAINT "UQ_217ba147c5de6c107f2fa7fa271"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."user" DROP COLUMN "addressId"`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "endTime" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "startTime" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "dbo"."teacher_availability" ADD "dayOfWeek" character varying NOT NULL`);
            yield queryRunner.query(`DROP TABLE "dbo"."parent_profile"`);
            yield queryRunner.query(`DROP TABLE "dbo"."parent"`);
            yield queryRunner.query(`DROP TABLE "dbo"."teacher_availability_exception"`);
            yield queryRunner.query(`DROP TABLE "dbo"."address"`);
        });
    }
}
exports.CreateParentAndParentProfile1718415794144 = CreateParentAndParentProfile1718415794144;

import { MigrationInterface, QueryRunner } from "typeorm";

export class TeacherContentType1715754854261 implements MigrationInterface {
    name = 'TeacherContentType1715754854261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "dbo"."teacher_content_type_contenttype_enum" AS ENUM('Ebook', 'Video Tutorial', 'Lesson Plan', 'Worksheet')`);
        await queryRunner.query(`CREATE TABLE "dbo"."teacher_content_type" ("id" SERIAL NOT NULL, "contentType" "dbo"."teacher_content_type_contenttype_enum" NOT NULL, CONSTRAINT "PK_86adcf613d75b5198b7916fe18b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dbo"."teacher_content_type"`);
        await queryRunner.query(`DROP TYPE "dbo"."teacher_content_type_contenttype_enum"`);
    }

}

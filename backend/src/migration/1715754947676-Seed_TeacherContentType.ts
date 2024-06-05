import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedTeacherContentType1715754947676 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO dbo.teacher_content_type ("contentType") 
            VALUES 
                ('Ebook'),
                ('Video Tutorial'),
                ('Lesson Plan'),
                ('Worksheet')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM dbo.teacher_content_type 
            WHERE "contentType" IN ('Ebook', 'Video Tutorial', 'Lesson Plan', 'Worksheet')
        `);
    }

}

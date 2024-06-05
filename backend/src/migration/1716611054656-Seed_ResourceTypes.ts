import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedResourceTypes1716611054656 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      INSERT INTO resource_type (type) 
      VALUES 
        ('Video'),
        ('eBooks'),
        ('Documents'),
        ('Worksheets'),
        ('Links')
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DELETE FROM resource_type 
      WHERE type IN ('Video', 'eBooks', 'Documents', 'Worksheets', 'Links')
    `);
    }

}

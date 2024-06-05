import { MigrationInterface, QueryRunner } from "typeorm";

export class CreationOfUserTableAndRoles1716953656823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create User table
        await queryRunner.query(`CREATE TABLE "user" (
      "id" SERIAL NOT NULL, 
      "email" character varying NOT NULL, 
      "password" character varying NOT NULL, 
      CONSTRAINT "UQ_USER_EMAIL" UNIQUE ("email"), 
      CONSTRAINT "PK_USER_ID" PRIMARY KEY ("id")
    )`);

        // Create Role table
        await queryRunner.query(`CREATE TABLE "role" (
      "id" SERIAL NOT NULL, 
      "name" character varying NOT NULL, 
      CONSTRAINT "PK_ROLE_ID" PRIMARY KEY ("id")
    )`);

        // Create UserRole table
        await queryRunner.query(`CREATE TABLE "user_role" (
      "id" SERIAL NOT NULL, 
      "userId" integer NOT NULL, 
      "roleId" integer NOT NULL, 
      "assignedAt" TIMESTAMP NOT NULL, 
      CONSTRAINT "PK_USER_ROLE_ID" PRIMARY KEY ("id")
    )`);

        // Add foreign key constraints to UserRole table
        await queryRunner.query(`ALTER TABLE "user_role" 
      ADD CONSTRAINT "FK_USER_ROLE_USER" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_role" 
      ADD CONSTRAINT "FK_USER_ROLE_ROLE" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        // Update existing Teacher table to add userId relationship
        await queryRunner.query(`ALTER TABLE "teacher" 
      ADD "userId" integer, 
      ADD CONSTRAINT "FK_TEACHER_USER" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        // Update existing ParentEntity table to add userId relationship
        await queryRunner.query(`ALTER TABLE "parent_entity" 
      ADD "userId" integer, 
      ADD CONSTRAINT "FK_PARENT_USER" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.query(`ALTER TABLE "parent_entity" DROP CONSTRAINT "FK_PARENT_USER"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_TEACHER_USER"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_USER_ROLE_ROLE"`);
        await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "FK_USER_ROLE_USER"`);

        // Drop columns added to existing tables
        await queryRunner.query(`ALTER TABLE "parent_entity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "userId"`);

        // Drop new tables
        await queryRunner.query(`DROP TABLE "user_role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

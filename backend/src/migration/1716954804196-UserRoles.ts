import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoles1716954804196 implements MigrationInterface {
    name = 'UserRoles1716954804196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" RENAME COLUMN "email" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" RENAME CONSTRAINT "UQ_00634394dce7677d531749ed8e8" TO "UQ_4f596730e16ee49d9b081b5d8e5"`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent_entity" RENAME COLUMN "email" TO "userId"`);
        await queryRunner.query(`CREATE TABLE "dbo"."user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."user_role" ("id" SERIAL NOT NULL, "assignedAt" TIMESTAMP NOT NULL, "userId" integer, "roleId" integer, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dbo"."user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "dbo"."user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "dbo"."user_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "dbo"."resource" DROP COLUMN "file"`);
        await queryRunner.query(`ALTER TABLE "dbo"."resource" ADD "filePath" character varying`);
        await queryRunner.query(`ALTER TABLE "dbo"."resource" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "dbo"."resource" ADD "lastUpdated" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" DROP CONSTRAINT "UQ_4f596730e16ee49d9b081b5d8e5"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ADD CONSTRAINT "UQ_4f596730e16ee49d9b081b5d8e5" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent_entity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent_entity" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent_entity" ADD CONSTRAINT "UQ_8793ff0420984768f012445e125" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "dbo"."user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "dbo"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."user_role" ADD CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b" FOREIGN KEY ("roleId") REFERENCES "dbo"."role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ADD CONSTRAINT "FK_4f596730e16ee49d9b081b5d8e5" FOREIGN KEY ("userId") REFERENCES "dbo"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent_entity" ADD CONSTRAINT "FK_8793ff0420984768f012445e125" FOREIGN KEY ("userId") REFERENCES "dbo"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dbo"."user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "dbo"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dbo"."user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "dbo"."role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dbo"."user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "dbo"."user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent_entity" DROP CONSTRAINT "FK_8793ff0420984768f012445e125"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" DROP CONSTRAINT "FK_4f596730e16ee49d9b081b5d8e5"`);
        await queryRunner.query(`ALTER TABLE "dbo"."user_role" DROP CONSTRAINT "FK_dba55ed826ef26b5b22bd39409b"`);
        await queryRunner.query(`ALTER TABLE "dbo"."user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent_entity" DROP CONSTRAINT "UQ_8793ff0420984768f012445e125"`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent_entity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent_entity" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" DROP CONSTRAINT "UQ_4f596730e16ee49d9b081b5d8e5"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" ADD CONSTRAINT "UQ_4f596730e16ee49d9b081b5d8e5" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "dbo"."resource" DROP COLUMN "lastUpdated"`);
        await queryRunner.query(`ALTER TABLE "dbo"."resource" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "dbo"."resource" DROP COLUMN "filePath"`);
        await queryRunner.query(`ALTER TABLE "dbo"."resource" ADD "file" character varying`);
        await queryRunner.query(`DROP INDEX "dbo"."IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "dbo"."IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP TABLE "dbo"."user_roles_role"`);
        await queryRunner.query(`DROP TABLE "dbo"."user_role"`);
        await queryRunner.query(`DROP TABLE "dbo"."role"`);
        await queryRunner.query(`DROP TABLE "dbo"."user"`);
        await queryRunner.query(`ALTER TABLE "dbo"."parent_entity" RENAME COLUMN "userId" TO "email"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" RENAME CONSTRAINT "UQ_4f596730e16ee49d9b081b5d8e5" TO "UQ_00634394dce7677d531749ed8e8"`);
        await queryRunner.query(`ALTER TABLE "dbo"."teacher" RENAME COLUMN "userId" TO "email"`);
    }

}

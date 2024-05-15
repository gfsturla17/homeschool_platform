import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from "@nestjs/typeorm";

import { TeacherResourceService } from "../../service/teacher-resource-service";

import {DataSource, EntityManager} from "typeorm";
import {Teacheruploads} from "../../entities/Teacheruploads";
import {Teachers} from "../../entities/Teachers";
import {TeacherProfiles} from "../../entities/TeacherProfiles";
import {TeacherLoginCredentials} from "../../entities/TeacherLoginCredentials";
import {Contenttypes} from "../../entities/Contenttypes";

describe('TeacherResourceService', () => {
    let service: TeacherResourceService;
    let testingModule: TestingModule;
    let entityManager: EntityManager;
    beforeAll(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: '12345',
                    database: 'postgres',
                    entities: [
                        Contenttypes, Teacheruploads, Teachers,
                        TeacherProfiles, TeacherLoginCredentials
                    ],
                    synchronize: false, // It's safer to handle schema updates through migrations
                }),
                TypeOrmModule.forFeature([
                    Teacheruploads, Teachers, Contenttypes
                ]),
            ],
            providers: [
                TeacherResourceService,
            ],
        }).compile();
        const dataSource = testingModule.get<DataSource>(DataSource);
        await dataSource.createQueryRunner().query('TRUNCATE TABLE dbo.teachers RESTART IDENTITY CASCADE;');

        service = testingModule.get<TeacherResourceService>(TeacherResourceService);
        entityManager = testingModule.get<EntityManager>(EntityManager);
        // Create and save test entities
    });

    afterAll(async () => {
        const dataSource = testingModule.get<DataSource>(DataSource);
        await dataSource.createQueryRunner().query('TRUNCATE TABLE teachers RESTART IDENTITY CASCADE;');
        await dataSource.destroy();
    });

    it('should return a list of teacher resources for a given teacher ID and content type', async () => {
        const teacherId = 1;
        const contentType = 'Ebook';
        const teacher = await entityManager.save(Teachers, { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });

        const contentTypeEntity = await entityManager.save(Contenttypes, {
            contenttypeid: 2,
            contenttypename: 'Ebook'
        });

        await entityManager.save(Teacheruploads, [
            {
                filepath: 'path/to/file1',
                filedisplayname: 'File 1',
                contenttype: contentTypeEntity,
                teacher: teacher
            },
            {
                filepath: 'path/to/file2',
                filedisplayname: 'File 2',
                contenttype: contentTypeEntity,
                teacher: teacher
            }
        ]);



        const resources = await service.getTeacherResources(teacherId, contentType);

        // await entityManager.save(Contenttypes, { contenttypeid: 1, contenttypename: 'Ebook' });

        expect(resources).toHaveLength(2);
        expect(resources[0].uploadid).toBe(1);
        expect(resources[0].filepath).toBe('path/to/file1');
    });


});

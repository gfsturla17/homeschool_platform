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
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const teacher_resource_service_1 = require("../../service/teacher-resource-service");
const Contenttypes_1 = require("../../entities/Contenttypes");
const Teacheruploads_1 = require("../../entities/Teacheruploads");
const Teachers_1 = require("../../entities/Teachers");
const TeacherProfiles_1 = require("../../entities/TeacherProfiles");
const TeacherLoginCredentials_1 = require("../../entities/TeacherLoginCredentials");
const typeorm_2 = require("typeorm");
describe('TeacherResourceService', () => {
    let service;
    let testingModule;
    let entityManager;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const testingModule = yield testing_1.Test.createTestingModule({
            imports: [
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: '12345',
                    database: 'postgres',
                    entities: [
                        Contenttypes_1.Contenttypes, Teacheruploads_1.Teacheruploads, Teachers_1.Teachers,
                        TeacherProfiles_1.TeacherProfiles, TeacherLoginCredentials_1.TeacherLoginCredentials
                    ],
                    synchronize: false, // It's safer to handle schema updates through migrations
                }),
                typeorm_1.TypeOrmModule.forFeature([
                    Teacheruploads_1.Teacheruploads, Teachers_1.Teachers, Contenttypes_1.Contenttypes
                ]),
            ],
            providers: [
                teacher_resource_service_1.TeacherResourceService,
            ],
        }).compile();
        const dataSource = testingModule.get(typeorm_2.DataSource);
        yield dataSource.createQueryRunner().query('TRUNCATE TABLE dbo.teachers RESTART IDENTITY CASCADE;');
        service = testingModule.get(teacher_resource_service_1.TeacherResourceService);
        entityManager = testingModule.get(typeorm_2.EntityManager);
        // Create and save test entities
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const dataSource = testingModule.get(typeorm_2.DataSource);
        yield dataSource.createQueryRunner().query('TRUNCATE TABLE teachers RESTART IDENTITY CASCADE;');
        yield dataSource.destroy();
    }));
    it('should return a list of teacher resources for a given teacher ID and content type', () => __awaiter(void 0, void 0, void 0, function* () {
        const teacherId = 1;
        const contentType = 'Ebook';
        const teacher = yield entityManager.save(Teachers_1.Teachers, { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' });
        const contentTypeEntity = yield entityManager.save(Contenttypes_1.Contenttypes, {
            contenttypeid: 2,
            contenttypename: 'Ebook'
        });
        yield entityManager.save(Teacheruploads_1.Teacheruploads, [
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
        const resources = yield service.getTeacherResources(teacherId, contentType);
        // await entityManager.save(Contenttypes, { contenttypeid: 1, contenttypename: 'Ebook' });
        expect(resources).toHaveLength(2);
        expect(resources[0].uploadid).toBe(1);
        expect(resources[0].filepath).toBe('path/to/file1');
    }));
});
//# sourceMappingURL=teacher-resource-service.test.js.map
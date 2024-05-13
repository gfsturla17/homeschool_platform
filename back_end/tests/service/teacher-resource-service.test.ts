import { Pool } from 'pg';
import TeacherResourceService from '../../src/service/teacher-resource-service';

describe('TeacherResourceService', () => {
    const dbPool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: '12345',
        port: 5432,
    });


    beforeEach(async () => {
        // await dbPool.query('TRUNCATE TABLE dbo.TeacherUploads CASCADE');
        await dbPool.query('TRUNCATE TABLE dbo.ContentTypes CASCADE');
    });

    afterAll(async () => {
        await dbPool.end();
    });

    it('should return a list of teacher resources for a given teacher ID and content type', async () => {
        const teacherId = 1;
        const contentType = 'Ebook';

        await dbPool.query(`
            INSERT INTO dbo.ContentTypes (ContentTypeId, ContentTypeName)
            VALUES (1, 'Ebook')
        `);

        await dbPool.query(`
      INSERT INTO dbo.TeacherUploads (UploadId, TeacherId, FilePath, FileDisplayName, ContentTypeId)
      VALUES (1, ${teacherId}, 'path/to/file1', 'File 1', 1),
             (2, ${teacherId}, 'path/to/file2', 'File 2', 1)
    `);

        const teacherResourceService = new TeacherResourceService(dbPool);
        const resources = await teacherResourceService.getTeacherResources(teacherId, contentType);

        expect(resources).toHaveLength(2);
        expect(resources[0].uploadId).toBe(1);
        expect(resources[0].teacherId).toBe(teacherId);
        expect(resources[0].filePath).toBe('path/to/file1');
        expect(resources[0].fileDisplayName).toBe('File 1');
        expect(resources[0].contentTypeId).toBe(1);
    });

    it('should create a new teacher resource', async () => {
        const teacherId = 1;
        const contentType = 'Ebook';
        const filePath = 'path/to/file';
        const fileDisplayName = 'File Name';

        // Insert a content type into the database
        await dbPool.query(`
            INSERT INTO dbo.ContentTypes (ContentTypeID, ContentTypeName)
            VALUES (1, 'Ebook')
        `);

        const teacherResourceService = new TeacherResourceService(dbPool);
        const resource = await teacherResourceService.createTeacherResource(teacherId, contentType, filePath, fileDisplayName);

        expect(resource).not.toBeNull();
        expect(resource.teacherId).toBe(teacherId);
        expect(resource.contentTypeId).toBe(1);
        expect(resource.filePath).toBe(filePath);
        expect(resource.fileDisplayName).toBe(fileDisplayName);
    });
});
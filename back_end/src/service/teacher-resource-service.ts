import {Pool} from "pg";

interface TeacherResource {
    uploadId: number;
    teacherId: number;
    filePath: string;
    fileDisplayName: string;
    contentTypeId: number;
}

class TeacherResourceService {
    private dbPool: Pool;

    constructor(dbPool: Pool) {
        this.dbPool = dbPool;
    }

    async createTeacherResource(teacherId: number, contentType: string, filePath: string, fileDisplayName: string): Promise<TeacherResource> {
        const query = `
            SELECT ContentTypeId
            FROM dbo.ContentTypes
            WHERE ContentTypeName = $1
        `;
        const values = [contentType];
        const result = await this.dbPool.query(query, values);
        const contentTypeId = result.rows[0].contenttypeid;

        const query2 = `
            INSERT INTO dbo.TeacherUploads (TeacherId, FilePath, FileDisplayName, ContentTypeId)
            VALUES ($1, $2, $3, $4)
                RETURNING TeacherId, FilePath, FileDisplayName, ContentTypeId
        `;
        const values2 = [teacherId, filePath, fileDisplayName, contentTypeId];
        const result2 = await this.dbPool.query(query2, values2);

        const resource: TeacherResource = {
            teacherId: result2.rows[0].teacherid,
            filePath: result2.rows[0].filepath,
            fileDisplayName: result2.rows[0].filedisplayname,
            contentTypeId: result2.rows[0].contenttypeid,
        } as TeacherResource;
        return resource;

    }

    async getTeacherResources(teacherId: number, contentType: string): Promise<TeacherResource[]> {
        const query = `
            SELECT tu.*
            FROM dbo.TeacherUploads tu
                     JOIN dbo.ContentTypes ct ON tu.ContentTypeId = ct.ContentTypeId
            WHERE tu.TeacherId = $1 AND ct.ContentTypeName = $2
        `;
        const values = [teacherId, contentType];

        try {
            const result = await this.dbPool.query(query, values);
            return result.rows.map((row) => ({
                uploadId: row.uploadid,
                teacherId: row.teacherid,
                filePath: row.filepath,
                fileDisplayName: row.filedisplayname,
                contentTypeId: row.contenttypeid,
            }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default TeacherResourceService;
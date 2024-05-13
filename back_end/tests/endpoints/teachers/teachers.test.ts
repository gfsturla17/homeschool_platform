import request from 'supertest';
import path from 'path';
import teardownEndpointTests from "../teardown";
import setupEndpointTests from "../setup";

let server: any;

beforeEach(async () => {
    server = await setupEndpointTests(); // Set up server before all tests
});

afterEach(async () => {
    await teardownEndpointTests(server); // Tear down server after all tests
});

describe('POST /teachers/upload', () => {
    it('should upload a file successfully and return the file name', async () => {
        const filePath = path.join(__dirname, '../files/test_file.txt'); // Ensure you have this test file in your tests directory

        const response = await request(server)
            .post('/teachers/upload')
            .attach('file', filePath) // 'file' is the name of the field expected by multer in your route
            .expect(200);

        // Check the response structure and status
        expect(response.body).toHaveProperty('message', 'File uploaded successfully!');
        expect(response.body).toHaveProperty('filename');
        expect(response.status).toBe(200);
    });

    it('responds to /teachers/info', async () => {
        const response = await request(server).get('/teachers/info');
        expect(response.status).toBe(200);
    });

});

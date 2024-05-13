import request from 'supertest';
import app from '../src/app'; // Adjust the path to where your Express app is exported
import path from 'path';

let server: any;
beforeAll((done) => {
    server = app.listen(0, () => { // Node will assign an available port
        console.log(`Test server running on port ${server.address().port}`);
        done();
    });
});

afterAll((done) => {
    server.close(done); // Ensure the server is properly closed after tests
});

describe('POST /teachers/upload', () => {
    it('should upload a file successfully and return the file name', async () => {
        const filePath = path.join(__dirname, '/files/test_file.txt'); // Ensure you have this test file in your tests directory

        const response = await request(app)
            .post('/teachers/upload')
            .attach('file', filePath) // 'file' is the name of the field expected by multer in your route
            .expect(200);

        // Check the response structure and status
        expect(response.body).toHaveProperty('message', 'File uploaded successfully!');
        expect(response.body).toHaveProperty('filename');
        expect(response.status).toBe(200);
    });

    it('responds to /teachers/info', async () => {
        const response = await request(app).get('/teachers/info');
        expect(response.status).toBe(200);
    });

});

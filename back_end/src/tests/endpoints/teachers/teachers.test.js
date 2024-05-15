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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const teardown_1 = __importDefault(require("../teardown"));
const setup_1 = __importDefault(require("../setup"));
let server;
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    server = yield (0, setup_1.default)(); // Set up server before all tests
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, teardown_1.default)(server); // Tear down server after all tests
}));
describe('POST /teachers/upload', () => {
    it('should upload a file successfully and return the file name', () => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, '../files/test_file.txt'); // Ensure you have this test file in your tests directory
        const response = yield (0, supertest_1.default)(server)
            .post('/teachers/upload')
            .attach('file', filePath) // 'file' is the name of the field expected by multer in your route
            .expect(200);
        // Check the response structure and status
        expect(response.body).toHaveProperty('message', 'File uploaded successfully!');
        expect(response.body).toHaveProperty('filename');
        expect(response.status).toBe(200);
    }));
    it('responds to /teachers/info', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server).get('/teachers/info');
        expect(response.status).toBe(200);
    }));
});
//# sourceMappingURL=teachers.test.js.map
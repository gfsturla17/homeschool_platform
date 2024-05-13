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
const pg_1 = require("pg");
const database_1 = __importDefault(require("../src/service/database"));
const teacher_service_1 = __importDefault(require("../src/service/teacher-service"));
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '12345',
    port: 5432,
});
const db = new database_1.default(pool);
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.query('TRUNCATE dbo.teacher_login_credentials CASCADE');
    yield db.query('TRUNCATE dbo.teachers CASCADE');
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.close();
}));
describe('TeacherService', () => {
    const teacherService = new teacher_service_1.default(db);
    describe('registerTeacher', () => {
        it('should register a teacher', () => __awaiter(void 0, void 0, void 0, function* () {
            const teacherRegistration = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phoneNumber: '1234567890',
                address: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zipCode: '12345',
            };
            yield teacherService.registerTeacher(teacherRegistration);
            const result = yield db.query('SELECT * FROM dbo.teachers WHERE email = $1', [teacherRegistration.email]);
            expect(result.rows.length).toBe(1);
            expect(result.rows[0].first_name).toBe(teacherRegistration.firstName);
            expect(result.rows[0].last_name).toBe(teacherRegistration.lastName);
            expect(result.rows[0].email).toBe(teacherRegistration.email);
            expect(result.rows[0].phone_number).toBe(teacherRegistration.phoneNumber);
            expect(result.rows[0].address).toBe(teacherRegistration.address);
            expect(result.rows[0].city).toBe(teacherRegistration.city);
            expect(result.rows[0].state).toBe(teacherRegistration.state);
            expect(result.rows[0].zip_code).toBe(teacherRegistration.zipCode);
        }));
    });
    describe('loginTeacher', () => {
        it('should login a teacher', () => __awaiter(void 0, void 0, void 0, function* () {
            const teacherRegistration = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phoneNumber: '1234567890',
                address: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zipCode: '12345',
            };
            yield teacherService.registerTeacher(teacherRegistration);
            const teacherLogin = {
                email: 'john.doe@example.com',
                password: 'password123',
            };
            const result = yield teacherService.loginTeacher(teacherLogin);
            expect(result).not.toBeNull();
            expect(result.email).toBe(teacherLogin.email);
        }));
        it('should not login with invalid email or password', () => __awaiter(void 0, void 0, void 0, function* () {
            const teacherRegistration = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phoneNumber: '1234567890',
                address: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zipCode: '12345',
            };
            yield teacherService.registerTeacher(teacherRegistration);
            const teacherLogin = {
                email: 'john.doe@example.com',
                password: 'wrongpassword',
            };
            try {
                yield teacherService.loginTeacher(teacherLogin);
                fail('Should throw an error');
            }
            catch (error) {
                expect(error.message).toBe('Invalid email or password');
            }
        }));
        it('should not login with non-existent teacher', () => __awaiter(void 0, void 0, void 0, function* () {
            const teacherLogin = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };
            try {
                yield teacherService.loginTeacher(teacherLogin);
                fail('Should throw an error');
            }
            catch (error) {
                expect(error.message).toBe('Invalid email or password');
            }
        }));
        it('should return teacher object with all expected properties', () => __awaiter(void 0, void 0, void 0, function* () {
            const teacherRegistration = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phoneNumber: '1234567890',
                address: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zipCode: '12345',
            };
            yield teacherService.registerTeacher(teacherRegistration);
            const teacherLogin = {
                email: 'john.doe@example.com',
                password: 'password123',
            };
            const result = yield teacherService.loginTeacher(teacherLogin);
            expect(result).toHaveProperty('teacher_id');
            expect(result).toHaveProperty('first_name');
            expect(result).toHaveProperty('last_name');
            expect(result).toHaveProperty('email');
            expect(result).toHaveProperty('phone_number');
            expect(result).toHaveProperty('address');
            expect(result).toHaveProperty('city');
            expect(result).toHaveProperty('state');
            expect(result).toHaveProperty('zip_code');
        }));
    });
});

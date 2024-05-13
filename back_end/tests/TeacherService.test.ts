import { Pool } from 'pg';
import Database from "../src/service/database";
import TeacherService from "../src/service/teacher-service";

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '12345',
    port: 5432,
});

const db = new Database(pool);

beforeEach(async () => {
    await db.query('TRUNCATE dbo.teacher_login_credentials CASCADE');
    await db.query('TRUNCATE dbo.teachers CASCADE');
});

afterAll(async () => {
    await db.close();
});

describe('TeacherService', () => {
    const teacherService = new TeacherService(db);

    describe('registerTeacher', () => {
        it('should register a teacher', async () => {
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

            await teacherService.registerTeacher(teacherRegistration);

            const result = await db.query('SELECT * FROM dbo.teachers WHERE email = $1', [teacherRegistration.email]);
            expect(result.rows.length).toBe(1);
            expect(result.rows[0].first_name).toBe(teacherRegistration.firstName);
            expect(result.rows[0].last_name).toBe(teacherRegistration.lastName);
            expect(result.rows[0].email).toBe(teacherRegistration.email);
            expect(result.rows[0].phone_number).toBe(teacherRegistration.phoneNumber);
            expect(result.rows[0].address).toBe(teacherRegistration.address);
            expect(result.rows[0].city).toBe(teacherRegistration.city);
            expect(result.rows[0].state).toBe(teacherRegistration.state);
            expect(result.rows[0].zip_code).toBe(teacherRegistration.zipCode);
        });
    });

    describe('loginTeacher', () => {
        it('should login a teacher', async () => {
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

            await teacherService.registerTeacher(teacherRegistration);

            const teacherLogin = {
                email: 'john.doe@example.com',
                password: 'password123',
            };

            const result = await teacherService.loginTeacher(teacherLogin);
            expect(result).not.toBeNull();
            expect(result.email).toBe(teacherLogin.email);
        });

        it('should not login with invalid email or password', async () => {
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

            await teacherService.registerTeacher(teacherRegistration);

            const teacherLogin = {
                email: 'john.doe@example.com',
                password: 'wrongpassword',
            };

            try {
                await teacherService.loginTeacher(teacherLogin);
                fail('Should throw an error');
            } catch (error: any) {
                expect(error.message).toBe('Invalid email or password');
            }
        });

        it('should not login with non-existent teacher', async () => {
            const teacherLogin = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };

            try {
                await teacherService.loginTeacher(teacherLogin);
                fail('Should throw an error');
            } catch (error: any) {
                expect(error.message).toBe('Invalid email or password');
            }
        });

        it('should return teacher object with all expected properties', async () => {
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

            await teacherService.registerTeacher(teacherRegistration);

            const teacherLogin = {
                email: 'john.doe@example.com',
                password: 'password123',
            };

            const result = await teacherService.loginTeacher(teacherLogin);
            expect(result).toHaveProperty('teacher_id');
            expect(result).toHaveProperty('first_name');
            expect(result).toHaveProperty('last_name');
            expect(result).toHaveProperty('email');
            expect(result).toHaveProperty('phone_number');
            expect(result).toHaveProperty('address');
            expect(result).toHaveProperty('city');
            expect(result).toHaveProperty('state');
            expect(result).toHaveProperty('zip_code');
        });
    });
});
import Database from "./database";
import { QueryResult } from 'pg';

interface TeacherRegistration {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
}

interface TeacherLogin {
    email: string;
    password: string;
}

class TeacherService {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    async registerTeacher(teacherRegistration: TeacherRegistration): Promise<void> {
        try {
            await this.db.query(`INSERT INTO dbo.teachers (first_name, last_name, email, phone_number, address, city, state, zip_code) 
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING teacher_id`,
                [teacherRegistration.firstName, teacherRegistration.lastName, teacherRegistration.email, teacherRegistration.phoneNumber, teacherRegistration.address, teacherRegistration.city, teacherRegistration.state, teacherRegistration.zipCode]);
            const teacherId = (await this.db.query(`SELECT teacher_id FROM dbo.teachers WHERE email = $1`, [teacherRegistration.email])).rows[0].teacher_id;
            await this.db.query(`INSERT INTO dbo.teacher_login_credentials (teacher_id, password_hash) VALUES ($1, $2)`, [teacherId, teacherRegistration.password]);
        } catch (error: any) {
            if (error.code === '23505') {
                if (error.constraint === 'teachers_email_key') {
                    throw new Error('Email already exists');
                }
            }
            throw error;
        }
    }

    async loginTeacher(teacherLogin: TeacherLogin): Promise<any> {
        try {
            const result = await this.db.query(`SELECT * FROM dbo.teachers t JOIN dbo.teacher_login_credentials tlc ON t.teacher_id = tlc.teacher_id WHERE t.email = $1 AND tlc.password_hash = $2`,
                [teacherLogin.email, teacherLogin.password]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            throw error;
        }
    }
}

export default TeacherService;
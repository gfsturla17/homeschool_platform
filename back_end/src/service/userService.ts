import Database from "./database";
import { QueryResult } from 'pg';

interface UserRegistration {
    username: string;
    email: string;
    password: string;
    birthdate: string;
}

class UserService {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    async registerUser(userRegistration: UserRegistration): Promise<void> {
        try {
            await this.db.query(`INSERT INTO users_login (username, email, password, birthdate) VALUES ($1, $2, $3, $4)`, [userRegistration.username, userRegistration.email, userRegistration.password, userRegistration.birthdate]);
        } catch (error: any) {
            if (error.code === '23505') {
                // This is the error code for unique constraint violation in PostgreSQL.
                // You can check the constraint name to determine which field caused the error.
                if (error.constraint === 'users_login_pkey') {
                    throw new Error('Username already exists');
                } else if (error.constraint === 'users_login_email_key') {
                    throw new Error('Email already exists');
                }
            }
            throw error;
        }
    }
}

export default UserService;
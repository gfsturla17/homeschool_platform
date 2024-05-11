import { Pool } from 'pg';

class Database {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: '12345',
            port: 5432,
        });
    }

    async query(query: string, params?: any[]): Promise<any> {
        try {
            const result = await this.pool.query(query, params);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async close(): Promise<void> {
        await this.pool.end();
    }
}

export default Database;
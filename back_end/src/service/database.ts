import { Pool } from 'pg';

class Database {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async query(query: string, params: any[] = []): Promise<any> {
        return this.pool.query(query, params);
    }

    async close(): Promise<void> {
        await this.pool.end();
    }
}

export default Database;
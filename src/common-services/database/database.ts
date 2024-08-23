
import sql, { ConnectionPool } from 'mssql';
import dbconfig from './dbconfig';



class Database {
    pool: ConnectionPool = null;
    
    constructor() {
        this.pool = null;
    }

    async connect() {
        try {
            if (this.pool) return this.pool; // If there's already a connection, return it

            this.pool = await sql.connect(dbconfig);
            console.log('Connected to MSSQL');
            return this.pool;
        } catch (error) {
            console.error('Database connection failed: ', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            if (this.pool) {
                await this.pool.close();
                console.log('Disconnected from MSSQL');
                this.pool = null;
            }
        } catch (error) {
            console.error('Failed to disconnect from MSSQL: ', error);
            throw error;
        }
    }

    async runQuery(query: string, params = {}) {
        try {
            const pool = await this.connect();
            const request = pool.request();

            // Add input parameters to the request
            for (const [key, value] of Object.entries(params)) {
                request.input(key, value);
            }

            const result = await request.query(query);
            return result.recordset;
        } catch (error) {
            console.error('Query execution failed: ', error);
            throw error;
        }
    }

    async insertData(table: string, data: any) {
        const columns = Object.keys(data).join(', ');
        const values = Object.keys(data).map(key => `@${key}`).join(', ');

        const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;

        return this.runQuery(query, data);
    }

    async updateDataWithConcurrency(table: string, id: number, data: any, concurrencyKey: string) {
        const setClause = Object.keys(data).map(key => `${key} = @${key}`).join(', ');

        const query = `UPDATE ${table} SET ${setClause} WHERE ConcurrencyKey = @ConcurrencyKey AND Id = @StudentId`;

        return this.runQuery(query, { ...data, ConcurrencyKey: concurrencyKey, StudentId: id });
    }

    async deleteData(table: string, concurrencyKey: string) {
        const query = `DELETE FROM ${table} WHERE ConcurrencyKey = @ConcurrencyKey`;

        return this.runQuery(query, { ConcurrencyKey: concurrencyKey });
    }
}

export default new Database();

import { Pool } from "pg";

// CONNECTION POOL
export const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number.parseInt(process.env.DB_PORT),
});

// SETUP DATABASE
export async function databaseSetup() {
    try {
        console.log("Checking database tables...");

        // SUPPLIERS TABLE
        await pool.query(`
            CREATE TABLE IF NOT EXISTS suppliers (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                contact_person VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                country VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Suppliers table ready");

        console.log("Database is ready to use!");
    } catch (error) {
        console.log(error);
        throw error; // Throw error so that server doesn't start if database fails
    }
}
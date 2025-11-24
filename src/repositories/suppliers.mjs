import { pool } from "../config/database.mjs";

// FUNCTION - GET all suppliers
export async function getAllSuppliers() {
    const result = await pool.query("SELECT * FROM suppliers");

    if (!result.rows) {
        throw new Error("Failed to get suppliers");
    }

    return result.rows;
}

// FUNCTION - Create a new supplier
export async function createSupplier(name, contact_person, email, phone, country) {
    const result = await pool.query(
        "INSERT INTO suppliers (name, contact_person, email, phone, country) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, contact_person, email, phone, country]
    );

    if (result.rowCount !== 1) {
        throw new Error("Failed to create supplier");
    }

    return result.rows[0];
}
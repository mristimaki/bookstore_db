import { pool } from "../config/database.mjs";

// GET all Suppliers
export async function getAllSuppliers() {
    const result = await pool.query("SELECT * FROM suppliers");

    if (!result.rows) {
        throw new Error("Failed to get suppliers");
    }

    return result.rows;
}

// GET Supplier by id
export async function getSupplierById(id) {
    const result = await pool.query(
        `SELECT
            suppliers.id,
            suppliers.name,
            suppliers.contact_person,
            suppliers.email,
            suppliers.phone,
            suppliers.country,
            suppliers.created_at,
            COUNT(products.id) AS product_count
        FROM suppliers 
        LEFT JOIN products ON suppliers.id = products.supplier_id
        WHERE suppliers.id = $1
        GROUP BY suppliers.id`
        [id]
    );

    if (!result.rows || result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

// CREATE Supplier
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

// UPDATE Supplier
export async function updateSupplier(id, name, contact_person, email, phone, country) {
    const result = await pool.query(
        `UPDATE suppliers
        SET name = $1, contact_person = $2, email = $3, phone = $4, country = $5
        WHERE id = $6
        RETURNING *`,
        [name, contact_person, email, phone, country, id]
    );

    if (result.rowCount !== 1) {
        return null;
    }

    return result.rows[0];
}

// DELETE Supplier by id
export async function deleteSupplier(id) {
    const result = await pool.query(
        `DELETE FROM suppliers WHERE id = $1 RETURNING *`,
        [id]
    );

    if (result.rowCount !== 1) {
        return null;
    }

    return result.rows[0];
}
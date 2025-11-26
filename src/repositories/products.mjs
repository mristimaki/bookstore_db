import { pool } from "../config/database.mjs";

// GET all products
export async function getAllProducts() {
    const result = await pool.query(
        `SELECT
            products.id,
            products.title,
            products.author,
            products.quantity,
            products.price,
            products.category,
            products.created_at,
            suppliers.name AS supplier_name,
            suppliers.country AS supplier_country,
            suppliers.id AS supplier_id
        FROM products
        LEFT JOIN suppliers ON products.supplier_id = suppliers.id
        ORDER BY products.id`
    );

    if (!result.rows) {
        throw new Error("Failed to get products");
    }

    return result.rows;
}
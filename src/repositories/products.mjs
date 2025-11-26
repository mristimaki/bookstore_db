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

// GET Product by id
export async function getProductById(id) {
    const result = await pool.query(
        `SELECT
            products.id,
            products.title,
            products.author,
            products.quantity,
            products.price,
            products.category,
            suppliers.name AS supplier_name,
            suppliers.country AS supplier_country,
            suppliers.id AS supplier_id
        FROM products
        LEFT JOIN suppliers ON products.supplier_id = suppliers.id
        WHERE products.id = $1`,
        [id]
    );

    if (!result.rows || result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
}

// CREATE Product
export async function createProduct(title, author, quantity, price, category, supplier_id) {
    const result = await pool.query(
        `INSERT INTO products (title, author, quantity, price, category, supplier_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [title, author, quantity, price, category, supplier_id]
    );

    if (result.rowCount !== 1) {
        throw new Error("Failed to create supplier");
    }

    return result.rows[0];
};

// PUT /products/:id - Update existing product
export async function updateProduct(id, title, author, quantity, price, category, supplier_id) {
    const result = await pool.query(
        `UPDATE products
        SET title = $1, author = $2, quantity = $3, price = $4, category = $5, supplier_id = $6
        WHERE id = $7
        RETURNING *`,
        [title, author, quantity, price, category, supplier_id, id]
    );

    if (result.rowCount !== 1) {
        return null;
    }

    return result.rows[0];
}

// DELETE /products/:id - Delete existing product
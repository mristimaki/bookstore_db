import express from "express";
import * as productRepo from "../repositories/products.mjs";
import { validateProduct } from "../utilities/validation.mjs";

export const router = express.Router();

// GET /products 
router.get("/", async (req, res) => {
    try {
        const products = await productRepo.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch products"});
    }
});

// GET /products/:id - Get product by id
router.get("/:id", async (req, res) => {
    const productId = Number.parseInt(req.params.id);

    try {
        const product = await productRepo.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
});

// POST /products - Create new product
router.post("/", async (req, res) => {
    try {
        const errors = validateProduct(req.body);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const { title, author, quantity, price, category, supplier_id } = req.body;

        const newProduct = await productRepo.createProduct(
            title,
            author,
            Number.parseInt(quantity),
            Number.parseFloat(price),
            category,
            Number.parseInt(supplier_id)
        );

        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        
        if (error.message && error.message.includes('foreign key')) {
            return res.status(400).json({ error: "Supplier does not exist" });
        }

        res.status(500).json({ error: "Failed to create product" });
    }
});
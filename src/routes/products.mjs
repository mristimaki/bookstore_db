import express from "express";
import * as productRepo from "../repositories/products.mjs";

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
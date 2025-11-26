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
})
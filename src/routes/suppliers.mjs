import express from "express";
import * as suppliersRepo from "../repositories/suppliers.mjs"; // Detta gör så att jag inte behöver uppdatera listan om jag lägger till något nytt
import { validateSupplier } from "../utilities/validation.mjs";

export const router = express.Router();

// GET /suppliers - Fetch all suppliers
router.get("/", async (req, res) => {
    try {
        const suppliers = await suppliersRepo.getAllSuppliers();
        res.status(200).json(suppliers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch suppliers" });
    }
});

// POST /suppliers - Create new supplier
router.post("/", async (req, res) => {
    try {
        const errors = validateSupplier(req.body);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const { name, contact_person, email, phone, country } = req.body;

        const newSupplier = await suppliersRepo.createSupplier(
            name,
            contact_person,
            email,
            phone,
            country
        );

        res.status(201).json(newSupplier);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create supplier." });
    }
});
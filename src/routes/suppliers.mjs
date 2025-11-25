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

// GET /suppliers/:id - Fetch a specifik supplier by id
router.get("/:id", async (req, res) => {
    const supplierId = Number.parseInt(req.params.id);

    try {
        const supplier = await suppliersRepo.getSupplierById(supplierId);

        if (!supplier) {
        return res.status(404).json({ error: "Supplier not found" });
        }

        res.status(200).json(supplier);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch supplier" });
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

// PUT /suppliers/:id - Update existing supplier
router.put("/:id", async (req, res) => {
    const supplierId = Number.parseInt(req.params.id);

    try {
        const errors = validateSupplier(req.body);

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const { name, contact_person, email, phone, country } = req.body;

        const updateSupplier = await suppliersRepo.updateSupplier(
            supplierId,
            name,
            contact_person,
            email,
            phone,
            country
        );

        if (!updateSupplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        res.status(200).json(updateSupplier);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update supplier" });
    }
});

// DELETE /suppliers/:id
router.delete('/:id', async (req, res) => {
    const supplierId = Number.parseInt(req.params.id);
    
    try {
        const deletedSupplier = await suppliersRepo.deleteSupplier(supplierId);

        if (!deletedSupplier) {
            return res.status(404).json({ error: "Supplier not found" });
        }

        res.status(200).json(deletedSupplier);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete supplier" });
    }
});
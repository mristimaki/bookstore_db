import "./config/variables.mjs"; // MÅSTE vara först så att .env laddas innan någon annan kod körs
import express from "express";
import { databaseSetup } from "./config/database.mjs";
import { router as suppliersRouter } from "./routes/suppliers.mjs";
import { router as productsRouter } from "./routes/products.mjs";

const app = express();

app.use(express.json());
app.use("/api/suppliers", suppliersRouter);
app.use("/api/products", productsRouter);

const PORT = process.env.SERVER_PORT || 3000;

async function startServer() {
    try {
        await databaseSetup();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();

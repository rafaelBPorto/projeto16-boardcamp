import express from "express";
import cors from "cors";
import categoriesRoutes from "./routes/categories.route.js"

const app = express();
app.use(express.json());
app.use(categoriesRoutes);

app.listen(4000, () => console.log("Server running in port: 4000"));

import express from "express";
import cors from "cors";
import categoriesRoutes from "./routes/categories.route.js"
import gamesRoutes from "./routes/games.route.js"

const app = express();
app.use(express.json());
app.use(categoriesRoutes);
app.use(gamesRoutes);

app.listen(4000, () => console.log("Server running in port: 4000"));

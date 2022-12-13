import express from "express";
import cors from "cors";
import categoriesRoutes from "./routes/categories.route.js";
import gamesRoutes from "./routes/games.route.js";
import customersRoutes from "./routes/customers.route.js";
import rentalRoutes from "./routes/rentals.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRoutes);
app.use(gamesRoutes);
app.use(customersRoutes);
app.use(rentalRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port: ${port}`));

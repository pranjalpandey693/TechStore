import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { authRoutes, cartRoutes, productRoutes } from "./routes";


dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart",cartRoutes)

//const PORT = process.env.PORT || 3001;

export default app;

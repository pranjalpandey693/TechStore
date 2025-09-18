import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { authRoutes, cartRoutes, productRoutes } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
const allowedOrigins = ["http://localhost", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

//const PORT = process.env.PORT || 3001;

export default app;

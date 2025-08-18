import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors"; 
dotenv.config({ quiet: true });
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
    connectDB();
});
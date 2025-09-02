import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ quiet: true });
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(process.cwd(), 'src/uploads')));
const authRoutes = await import('./routes/auth.route.js');
const qrRoutes = await import('./routes/qr.route.js');
app.use('/api/auth', authRoutes.default);
app.use('/api/qr', qrRoutes.default);
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.resolve(__dirname, "../../frontend/dist");
    app.use(express.static(frontendPath));
    app.get("/*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
    connectDB();
});
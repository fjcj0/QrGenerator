import { createCanvas } from 'canvas';
import { JSDOM } from 'jsdom';
const { window } = new JSDOM(`<!DOCTYPE html><body></body>`);
global.window = window;
global.document = window.document;
global.self = window;
global.HTMLElement = window.HTMLElement;
global.Blob = window.Blob;
global.XMLSerializer = window.XMLSerializer;
Object.defineProperty(global, 'navigator', {
  value: { userAgent: 'node.js' },
  writable: false,
  configurable: true,
});
document.createElement = (tagName) => {
  if (tagName === 'canvas') return createCanvas(1, 1);
  return window.document.createElement(tagName);
};
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from "cors"; 
import path from "path";
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
app.use('/api/qr',qrRoutes.default);
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
    connectDB();
});
import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { saveQr } from '../controllers/qr.controller.js';
const router = express.Router();
router.post('/save',verifyToken,saveQr);
export default router;
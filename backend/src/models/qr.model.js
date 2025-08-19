import mongoose from 'mongoose';
const qrSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  config: { type: mongoose.Schema.Types.Mixed, required: true }, 
  createdAt: { type: Date, default: Date.now }
});
export const QRCode = mongoose.model('QRCode', qrSchema);
import mongoose from 'mongoose';
const qrSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  config: { type: mongoose.Schema.Types.Mixed, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' }, 
  token: { type: String },
  url: { type: String },
}, { timestamps: true });
export const QRCode = mongoose.model('QRCode', qrSchema);
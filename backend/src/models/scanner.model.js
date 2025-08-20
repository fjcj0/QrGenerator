import mongoose from "mongoose";
const scannerSchema = new mongoose.Schema({
  qrId: { type: mongoose.Schema.Types.ObjectId, ref: "QRCode", required: true },
  userAgent: { type: String },   
  ipAddress: { type: String },  
  scannedAt: { type: Date, default: Date.now },
  scanCount: {type:Number ,default: 0}
});
export const Scanner = mongoose.model("Scanner", scannerSchema);
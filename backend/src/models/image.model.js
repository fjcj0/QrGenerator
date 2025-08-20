import mongoose from 'mongoose';
const imageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  logoUrl: {type:String,default: null}
});
export const QRImages = mongoose.model('Image', imageSchema);
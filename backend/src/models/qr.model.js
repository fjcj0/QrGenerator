import mongoose from 'mongoose';
const qrSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  config: { 
    type: mongoose.Schema.Types.Mixed,  
    required: true 
  },
  imageId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Image'   
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  logo: { 
    type: String, 
    default: null  
  }
});
export const QRCode = mongoose.model('QRCode', qrSchema);
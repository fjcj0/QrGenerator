import mongoose from 'mongoose';
const weeklyStatsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weekStart: { type: Date, required: true },
  weekEnd: { type: Date, required: true },
  totalQrCreated: { type: Number, default: 0 },
  totalScans: { type: Number, default: 0 },
  totalMoneyLost: { type: Number, default: 0 },
}, { timestamps: true });
export const WeeklyStats = mongoose.model('WeeklyStats', weeklyStatsSchema);
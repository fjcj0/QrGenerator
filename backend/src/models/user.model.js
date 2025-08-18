import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    profilePicture: {
        type: String,
        default: '/',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    totalFreeQr: {
        type: Number,
        default: 10
    },
    totalMoneyLost: {
        type: Number,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
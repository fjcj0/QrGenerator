import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_LINK);
        console.log(`MongoDB Connected successfully!!`);
    } catch (error) {
        console.log("MongoDB connection error: ", error.message);
    }
};
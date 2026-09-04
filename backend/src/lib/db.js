import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected", conn.connection.host);
    } catch (error) {
        console.error("Error connection to MONGODB:", error);
        process.exit(1); // HS 1 STATUS CODE MEANS FAIL AND 0 MEANS SUCCESS
    }
}
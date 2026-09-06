import mongoose from "mongoose";
import dns from "node:dns";

export const connectDB = async () => {
    try {
        // Local development: use Google DNS because the current
        // network DNS is failing to resolve MongoDB SRV records.
        if (process.env.NODE_ENV !== "production") {
            dns.setServers(["8.8.8.8", "8.8.4.4"]);
        }

        if(!process.env.MONGO_URI) throw new Error("MONGO_URI is not set.");

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected:", conn.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // HS 1 STATUS CODE MEANS FAIL, 0 MEANS SUCCESS
    }
};
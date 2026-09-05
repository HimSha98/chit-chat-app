import mongoose from "mongoose";

// HS THIS IS THE USER SCHEMA
const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        profilePic: {
            type: String,
            default: ""
        }
    },
    { timestamps: true} // HS ADDED CREATEDAT & UPDATEDAT TO THE USER MODEL
);

// HS THIS IS THE ACTUAL USER MODEL
const User = mongoose.model("User", userSchema);

export default User;
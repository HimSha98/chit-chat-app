// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
const __dirname = path.resolve();

app.use('/api/auth/', authRoutes);
app.use('/api/messages', messageRoutes)

// HS MAKE READY FOR THE DEPLOYMENT
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // HS FOR ANY OTHER ROUTE OTHER THAN API ROUTES WE WILL SERVER INDEX.HTML
    // app.get ("*", (req, res) => {
    //     res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    // });
    // HS USING UNDERSCORE INSTEAD OF REQ AS WE ARE JUST DOING CONNECTION NOT REQUESTING ANYTHING
    app.get ("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    });
}

app.listen(PORT, () => {
    // console.log("Server is running on this port: ", PORT);
    console.log("Server running on port:", PORT);
    connectDB();
})
// console.log(process, "this is the process");
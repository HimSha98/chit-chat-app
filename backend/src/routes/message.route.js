import express from "express";

const router = express.Router();

router.get('/send', (res, req) => {
    console.log("Send message's endpoint.")
});

export default router;
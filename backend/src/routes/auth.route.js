import express from "express";

const router = express.Router();


router.get('/signup', (req, res) => {
    res.send("This is signup Endpoint");
});

router.get('/login', (req, res) => {
    res.send("This is login Endpoint");
});

router.get('/logout', (req, res) => {
    res.send("This is logout Endpoint");
});

export default router;
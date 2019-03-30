"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (req, res) => {
    res.send('Hello, World!');
});
router.get("/j", (req, res) => {
    if (req.isAuthenticated()) {
        res.send("General Kenobi");
    }
    else {
        res.send('auth failed');
    }
});
exports.PayloadController = router;

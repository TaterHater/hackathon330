"use strict";
/* app/controllers/welcome.controller.ts */
Object.defineProperty(exports, "__esModule", { value: true });
// Import only what we need from express
const express_1 = require("express");
// Assign router to the express.Router() instance
const router = express_1.Router();
router.get('/', (req, res) => {
    // Reply with a hello world when no name param is provided
    res.send('logins');
});
router.post('/j', (req, res) => {
    console.log(req.ip);
    res.json(req.body);
});
// Export the express.Router() instance to be used by server.ts
exports.BdataController = router;

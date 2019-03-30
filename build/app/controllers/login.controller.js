"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* app/controllers/welcome.controller.ts */
const express_1 = require("express");
const passport_local_1 = __importDefault(require("passport-local"));
const _1 = require("./");
const router = express_1.Router();
const bdata = require("../bdata/index");
const b = new bdata();
const passport = require("passport");
const LocalStrategy = passport_local_1.default.Strategy;
const encryptionTools = require("../services/encryptionTools");
const eTools = new encryptionTools();
const test = require("../UserController");
let t = new test();
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (id, cb) {
    b.query(`User`, `Get`, "*", `UserId= ${id.UserId}`).then((res) => {
        cb(null, res);
    });
});
passport.use(new LocalStrategy((username, password, done) => {
    b.query(`User`, `Get`, "Salt", `Email = '${username}'`).then((res) => {
        let tempPass = eTools.saltHashPassword(password, JSON.parse(res)[0]["Salt"]);
        b.query(`User`, `Get`, "*", ` Email = '${username}'AND PasswordHash = '${tempPass.passwordHash}'`).then((res) => {
            done(null, JSON.parse(res)[0]);
        });
    });
}));
router.use(passport.initialize());
router.use(passport.session());
router.post("/", passport.authenticate("local", { failureRedirect: "/" }), (req, res) => {
    res.send(`sucess: ${JSON.stringify(req.session)}`);
});
router.use("/model", _1.ModelGeneratorController);
router.get("/j", (req, res) => {
    if (req.isAuthenticated()) {
        res.send("General Kenobi");
    }
    else {
        b.generateFromTableName("User").then((result) => {
            res.send(result);
        });
    }
});
router.post("/register", (req, res) => {
    if (req.body.password && req.body.username && req.body.confirmPassword) {
        if (req.body.password == req.body.confirmPassword) {
            let passInfo = eTools.saltHashPassword(req.body.password);
            t.createUser(req.body.username, passInfo.passwordHash, passInfo.salt).then((response) => {
                res.send(`user Created: ${response}`);
            });
        }
    }
    else {
        res.send("registration failed");
    }
});
exports.LoginController = router;

"use strict";
/* app/server.ts */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import everything from express and assign it to the express variable
const express = require("express");
const passport_1 = __importDefault(require("passport"));
const bodyParser = __importStar(require("body-parser"));
const bdata = require("./bdata/index");
const helmet = require("helmet");
const controllers_1 = require("./controllers");
const app = express();
const b = new bdata();
const port = 3000;
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
//security stuff
app.use(helmet());
app.use(require("express-session")({
    secret: "Richard Nixon",
    resave: false,
    saveUninitialized: false
}));
app.use("/", controllers_1.LoginController);
app.get("/bdata/query", ensureAuthenticated, (req, res) => {
    //badRequest if these fields are missing
    if (!req.body.tableName || !req.body.query) {
        res.statusCode = 400;
        res.send("error");
    }
    b.query(req.body.tableName, req.body.query, "*", req.body.condition).then((result) => {
        res.json(result);
    });
});
app.get("/bdata/model", ensureAuthenticated, (req, res) => {
    if (!req.body.tableName) {
        res.statusCode = 400;
        res.send("error");
    }
    b.generateFromTableName(req.body.tableName).then((text) => {
        res.sendFile(text);
    });
});
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send("failed to authenticate");
}
app.on("listening", function () {
    console.log("ok, server is running");
});
app.listen(port, () => {
    console.log(`Started listening on port ${port}`);
});

/* app/controllers/welcome.controller.ts */
import { Router, Request, Response } from "express";
import passportLocal from "passport-local";
import { SnippetController } from "./snippet.controller";

const router: Router = Router();
const bdata = require("../bdata/index");
const b = new bdata();
const passport = require("passport");
const LocalStrategy = passportLocal.Strategy;
const encryptionTools = require("../services/encryptionTools");
const eTools = new encryptionTools();
const test = require("../UserController");

let t = new test();

passport.serializeUser(function(user: any, cb: any) {
  console.log(`seriaize: ${typeof user}`);
  if (user === null) {
    cb("error");
  }
  cb(null, user);
});

passport.deserializeUser(function(id: any, cb: Function) {
  console.log(`sdeeriaize: ${typeof id} ${typeof cb}`);
  b.query(`User`, `Get`, "*", `UserId= ${id.UserId}`).then((res: any) => {
    if (res == "[]") {
      cb(null, false);
    }
    cb(null, res);
  });
});
passport.use(
  new LocalStrategy((username: string, password: string, done: Function) => {
    console.log(done.toString())
    b.query(`User`, `Get`, "Salt", `Email = '${username}'`)
      .then((res: any) => {
        if (res == "[]") {
          done(null,`invalid username`);
        } else {
          let tempPass: any = eTools.saltHashPassword(
            password,
            JSON.parse(res)[0]["Salt"]
          );
          b.query(
            `User`,
            `Get`,
            "*",
            ` Email = '${username}'AND PasswordHash = '${
              tempPass.passwordHash
            }'`
          ).then((res: any) => {
            done(null, JSON.parse(res)[0]);
          });
        }
      })
      .catch((res: any) => {
        done(`error: invalid username2`);
      });
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req: any, res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    console.log(req.user)
    if(req.user == 'invalid username'){
      console.log('asdsafdsfqaf')
      res.status(401)
      res.send( JSON.parse(
        `{ "Error": "invalid username"}`
      ))
      return
    }
    res.send(
      JSON.parse(
        `{ "UserId": ${req.user.UserId}, "Username": "${req.user.Username}"}`
      )
    );
  }
);
router.use("/snippet", SnippetController);


router.post("/register", (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  if (req.body.password && req.body.username && req.body.confirmPassword) {
    if (req.body.password == req.body.confirmPassword) {
      let passInfo: any = eTools.saltHashPassword(req.body.password);
      t.createUser(
        req.body.username,
        passInfo.passwordHash,
        passInfo.salt
      ).then((response: any) => {
        res.send(`user Created: ${response}`);
      });
    }
  } else {
    res.send("registration failed");
  }
});

export const LoginController: Router = router;

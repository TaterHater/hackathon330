import { Router, Request, Response } from "express";
const bdata = require("../bdata/index");
const b = new bdata();

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.setHeader('Access-Control-Allow-Origin','*')
  if (req.isAuthenticated()) {
    res.send("Hello, Authenticated World!");

  }
  res.send("Hello, World!");
});
router.post('/create', (req: Request, res: Response) => {
  console.log("body "+req.body)
  res.setHeader('Access-Control-Allow-Origin','*')

 // if (req.isAuthenticated()) {
    try{
      b.directQuery(`INSERT INTO Snippet (UserId, Body, Language) VALUES(${req.body.UserId || 1},"${encodeURI(req.body.Body)}","${encodeURI(req.body.Language)}")`)
      res.send();
    }
    catch(e){
      res.status(500)
      res.send("error: "+e)
    }
  //} else {
  //  res.status(401)
  //  res.send("auth failed");
 // }
});

export const SnippetController: Router = router;

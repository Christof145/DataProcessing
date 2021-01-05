var express = require("express");
var app = express();

app.get("/url", (req, res, next) => {
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
 });
 app.listen(3000)
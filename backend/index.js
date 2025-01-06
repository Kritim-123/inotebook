import connectToMongo from "./db.js";
import express from "express";

connectToMongo();

const app = express();
const port = 2700;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

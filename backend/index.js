const connectToMongo = require("./db");
connectToMongo();

const express = require("express");
const app = express();
const port = 2700;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

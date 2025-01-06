import connectToMongo from "./db.js";
import express from "express";
import {authRoute} from "./routes/auth.js";
import {noteRoute} from "./routes/notes.js";

connectToMongo();

const app = express();
const port = 2700;

//Available Routes

app.use("/api/auth", authRoute);
app.use("/api/note", noteRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

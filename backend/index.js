import connectToMongo from "./db.js";
import express from "express";
import { authRoute } from "./routes/auth.js";
import { noteRoute } from "./routes/notes.js";
import cors from "cors";

connectToMongo();

const app = express();
const port = 2700;

app.use(express.json());
app.use(cors())

//Available Routes

app.use("/api/auth", authRoute);
app.use("/api/notes", noteRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json({ msg: "Matrix Shop Home API up in runing" });
});

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(port, () => {
    console.log(`Matrix Shop API is listening on http://localhost:${port}`);
  });
});

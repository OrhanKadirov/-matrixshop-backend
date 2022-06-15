import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routers/users.js";
// import productRoutes from "./routers/products.js";
import { Product } from "./models/Product.js";
import { User } from "./models/User.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

//app.get("/products", productRoutes);
//app.use("/users", userRoutes);

app.get("/", (req, res) => {
  return res.json({ msg: "Matrix Shop  API up and running" });
});

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(PORT, () => {
    console.log(
      `Matrix Shop API is listening on port http://localhost:${PORT}`
    );
  });
});

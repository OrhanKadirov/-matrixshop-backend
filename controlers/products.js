import { Product } from "../models/Product.js";

export const getProducts = async (req, res) => {
  // console.log("Rutes product.js 2");
  try {
    const products = await Product.find().exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

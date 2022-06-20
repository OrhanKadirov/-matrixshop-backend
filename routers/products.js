import express from "express";
import { getProducts } from "../controlers/products.js";

const router = express.Router();

// console.log("Rutes product.js");
router.get("/", getProducts);

export default router;

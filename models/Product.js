import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 32,
  },
  category: {
    type: Object,
    ref: "Category",
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});
export const Product = mongoose.model("Product", productSchema, "products");

import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
    unique: true,
  },
});

export const Category = mongoose.model("Category", CategorySchema, "category");

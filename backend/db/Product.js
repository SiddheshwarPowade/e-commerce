import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  userId: String,
  category: String,
  company: String,
});

export const Product = mongoose.model("products", productSchema);

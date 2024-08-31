import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  currency: String,
  price: Number,
  timestamp: { type: Date, default: Date.now },
});

const Price = mongoose.model("Price", priceSchema);
export default Price;

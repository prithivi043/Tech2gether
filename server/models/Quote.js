import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  service: { type: String, required: true },
  plan: { type: String, required: true }, // <-- ADD THIS
  budget: { type: Number, required: true },
  message: { type: String },
}, { timestamps: true });


const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;

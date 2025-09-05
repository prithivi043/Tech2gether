import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http"; // Required for Vercel
import contactRoutes from "./routes/contactRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files if needed (for frontend build)
app.use(express.static("build", {
  maxAge: "1y",
  etag: false
}));

// MongoDB Connection
let isConnected = false; // Prevent multiple connections on serverless
const connectDB = async () => {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB Connected");
      isConnected = true;
    } catch (err) {
      console.error("❌ MongoDB Error:", err);
    }
  }
};
connectDB();

// Routes
app.use("/api/contact", contactRoutes);

// Export for Vercel serverless
export default serverless(app);

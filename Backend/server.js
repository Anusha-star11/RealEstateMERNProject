import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import slideRoutes from './routes/slides.route.js'; // Import the slides route

dotenv.config();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Define __dirname for ES modules
const __dirname = path.resolve();

const allowedOrigins = [
  'http://localhost:5173' // For local frontend during development
];

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'realestate', 'dist')));

// API Routes
app.use("/api", slideRoutes); 
app.use('/uploads', express.static('uploads'));
// Register the slides route with base path /api

// Start Server
app.listen(5001, () => {
  console.log("Server is running on port 5001!");
});

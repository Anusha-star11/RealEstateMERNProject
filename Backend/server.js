import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import slideRoutes from './routes/slides.route.js'; 
import projectRoutes from './routes/project.route.js';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
mongoose
.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Define __dirname for ES modules
// const __dirname = path.resolve();

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
app.use('/uploads', express.static('uploads'));

// API Routes
app.use("/api", slideRoutes); 
app.use("/api", projectRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size is too large. Max size is 5MB.' });
    }
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: 'Something broke!' });
});


// Register the slides route with base path /api

// Start Server
app.listen(5001, () => {
  console.log("Server is running on port 5001!");
});

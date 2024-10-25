import express from 'express';
import multer from 'multer';
import Slide from '../models/slides.model.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure the `uploads` directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// GET route to retrieve all slides
router.get("/slides", async (req, res) => {
  try {
    const slides = await Slide.find();
    res.status(200).json(slides);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve slides" });
  }
});

// POST route to add a new slide
router.post("/slides", upload.single("backgroundImage"), async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const backgroundImage = req.file ? req.file.path : null; // File path

    const newSlide = new Slide({
      title,
      subtitle,
      backgroundImage,
    });

    await newSlide.save();
    res.status(201).json({ message: "Slide added successfully" });
  } catch (error) {
    console.error("Error adding slide:", error);
    res.status(500).json({ error: "Failed to add slide" });
  }
});

export default router;

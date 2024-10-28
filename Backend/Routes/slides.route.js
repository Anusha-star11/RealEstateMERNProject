import express from 'express';
import multer from 'multer';
import path from 'path';
import Slide from '../models/slides.model.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this directory exists
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WEBP files are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024 // 5MB limit
  }
});

// GET route to retrieve all slides
router.get("/slides", async (req, res) => {
  try {
    const slides = await Slide.find();
    res.status(200).json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error);
    res.status(500).json({ error: "Failed to retrieve slides" });
  }
});

// POST route to add a new slide
router.post("/slides", upload.single("backgroundImage"), async (req, res) => {
  try {
    const { title, subtitle, backgroundImageURL } = req.body;
    
    let backgroundImage;
    if (req.file) {
      // If file was uploaded, create the full URL
      backgroundImage = `/uploads/${req.file.filename}`;
    } else if (backgroundImageURL) {
      // If URL was provided, use that
      backgroundImage = backgroundImageURL;
    } else {
      return res.status(400).json({ error: "Either backgroundImage file or backgroundImageURL is required" });
    }

    const newSlide = new Slide({
      title,
      subtitle,
      backgroundImage,
    });

    await newSlide.save();
    res.status(201).json({ 
      message: "Slide added successfully", 
      slide: newSlide 
    });
  } catch (error) {
    console.error("Error adding slide:", error);
    res.status(500).json({ error: "Failed to add slide" });
  }
});


// Update a slide
// slides.route.js
router.put('/slides/:id', async (req, res) => {
  try {
    const { title, subtitle, backgroundImage } = req.body;
    const updatedSlide = await Slide.findByIdAndUpdate(
      req.params.id,
      {
        title,
        subtitle,
        backgroundImage,
      },
      { new: true }
    );
    res.json(updatedSlide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a slide
router.delete("/slides/:id", async (req, res) => {
  try {
    const deletedSlide = await Slide.findByIdAndDelete(req.params.id);
    if (!deletedSlide) {
      return res.status(404).json({ error: "Slide not found" });
    }

    res.status(200).json({ message: "Slide deleted successfully" });
  } catch (error) {
    console.error("Error deleting slide:", error);
    res.status(500).json({ error: "Failed to delete slide" });
  }
});


export default router;
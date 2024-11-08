import express from 'express';
import multer from 'multer';
import path from 'path';
import Slide from '../Models/slides.model.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create new slide
router.post('/slides', upload.single('backgroundImage'), async (req, res) => {
  try {
    let backgroundImagePath;
    
    if (req.file) {
      // If file was uploaded
      backgroundImagePath = `/uploads/${req.file.filename}`;
    } else if (req.body.backgroundImageURL) {
      // If URL was provided
      backgroundImagePath = req.body.backgroundImageURL;
    } else {
      return res.status(400).json({ error: 'No image provided' });
    }

    const newSlide = new Slide({
      title: req.body.title,
      subtitle: req.body.subtitle,
      backgroundImage: backgroundImagePath
    });

    const savedSlide = await newSlide.save();
    res.status(201).json(savedSlide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/slides", async (req, res) => {
  try {
    const slides = await Slide.find();
    res.status(200).json(slides);
  } catch (error) {
    console.error("Error fetching slides:", error);
    res.status(500).json({ error: "Failed to retrieve slides" });
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
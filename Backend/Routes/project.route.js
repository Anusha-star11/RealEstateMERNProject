import express from 'express';
import multer from 'multer';
import path from 'path';
import Project from '../models/projects.model.js'; // Adjust the path if needed

const router = express.Router();

// Configure multer for project images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `project-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Create new project
router.post('/projects', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    let imageUrl;

    // Handle both file uploads and image URLs
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else {
      imageUrl = req.body.image;
    }

    const newProject = new Project({
      title,
      description,
      category,
      image: imageUrl
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
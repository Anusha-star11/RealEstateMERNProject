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
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'project-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Upload image endpoint
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

// Create new project
router.post('/projects', async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    if (!title || !description || !category || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = new Project({
      title,
      description,
      category,
      image
    });

    const savedProject = await newProject.save();
    res.status(201).json({ message: "Project added successfully", project: savedProject });
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
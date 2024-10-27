import express from 'express';
import multer from 'multer';
import Project from '../models/projects.model.js'; // Adjust the path if needed

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

// POST route to add a new project
router.post("/projects", upload.single("image"), async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("File:", req.file);

    const { title, description, category } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    console.log("Creating new project with data:", { title, description, category, image });

    const newProject = new Project({
      title,
      description,
      category,
      image,
    });

    await newProject.save();
    console.log("Project saved successfully");

    res.status(201).json({ message: "Project added successfully" });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ error: "Failed to add project" });
  }
});

// GET route to fetch all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

export default router;

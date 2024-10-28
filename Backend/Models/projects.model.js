// models/Project.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const projectSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        default: uuidv4, // Automatically generate a unique ID
      },
    title: {
    type: String,
    required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
});


const Project = mongoose.model("Project", projectSchema);

export default Project;
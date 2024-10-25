// models/Slide.js
import mongoose from "mongoose";

const slideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define the model as "Slide" instead of "User"
const Slide = mongoose.model("Slide", slideSchema);

export default Slide;

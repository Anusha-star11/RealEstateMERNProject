import { useState } from "react";
import axios from 'axios';

export const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageSourceType, setImageSourceType] = useState("url"); // 'url' or 'upload'
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let finalImageUrl = '';
      
      // If uploading a file, handle it first
      if (imageSourceType === "upload" && imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("backgroundImage", imageFile);
        
        // First, upload the image
        const uploadResponse = await axios.post("http://localhost:5001/api/upload", uploadFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        finalImageUrl = uploadResponse.data.imageUrl;
      } else {
        finalImageUrl = imageUrl; // Use the URL directly if imageSourceType is "url"
      }

      // Then create the project with the image URL
      const projectData = {
        title,
        description,
        category,
        image: finalImageUrl,
      };

      const response = await axios.post("http://localhost:5001/api/projects", projectData);

      setMessage("Project added successfully!");
      // Clear form
      setTitle("");
      setDescription("");
      setCategory("");
      setImageUrl("");
      setImageFile(null);
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.message || "An error occurred. Please try again later.");
    }
  };



  return (
    <section>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Image Source Type Toggle */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Image Source</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="url"
                  checked={imageSourceType === "url"}
                  onChange={() => setImageSourceType("url")}
                  className="mr-2"
                />
                Image URL
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="upload"
                  checked={imageSourceType === "upload"}
                  onChange={() => setImageSourceType("upload")}
                  className="mr-2"
                />
                Upload Image
              </label>
            </div>
          </div>

          {/* Conditionally Render Image URL or File Input */}
          {imageSourceType === "url" ? (
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="imageUrl">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required={imageSourceType === "url"}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="imageFile">
                Upload Image
              </label>
              <input
                type="file"
                id="imageFile"
                onChange={(e) => setImageFile(e.target.files[0])}
                required={imageSourceType === "upload"}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Add Project
          </button>
        </form>

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </section>
  );
};

export default ProjectForm;
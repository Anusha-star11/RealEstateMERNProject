import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const SlideForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [backgroundImageType, setBackgroundImageType] = useState("url");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [backgroundImageURL, setBackgroundImageURL] = useState("");
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch the slide data for editing
      const fetchSlide = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/slides/${id}`);
          if (response.ok) {
            const data = await response.json();
            setTitle(data.title);
            setSubtitle(data.subtitle);
            setBackgroundImageURL(data.backgroundImage);
            setBackgroundImageType("url");
          } else {
            console.error("Failed to fetch slide");
          }
        } catch (error) {
          console.error("Error fetching slide:", error);
        }
      };
      fetchSlide();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowSuccessMessage(false);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);

      if (backgroundImageType === "upload" && backgroundImage) {
        formData.append("backgroundImage", backgroundImage);
      } else if (backgroundImageType === "url" && backgroundImageURL) {
        formData.append("backgroundImageURL", backgroundImageURL);
      } else {
        setError("Please provide either an image file or URL");
        setIsSubmitting(false);
        return;
      }

      const method = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:5001/api/slides/${id}`
        : "http://localhost:5001/api/slides";

      const response = await fetch(url, { method, body: formData });
      const data = await response.json();

      if (response.ok) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate("/edit");
        }, 3000);
      } else {
        setError(data.error || "Failed to add/update slide");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while adding/updating the slide");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size too large. Maximum size is 5MB.");
        e.target.value = "";
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Only JPEG, PNG, GIF and WEBP files are allowed.");
        e.target.value = "";
        return;
      }

      setBackgroundImage(file);
      setError("");
    }
  };

  return (
    <section className="relative">
      {/* Success Message Toast */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="font-medium">
                {id ? "Slide updated successfully!" : "Slide added successfully!"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">{id ? "Edit Slide" : "Add New Slide"}</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

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
            <label className="block text-gray-700 font-bold mb-2" htmlFor="subtitle">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Background Image Source</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="url"
                  checked={backgroundImageType === "url"}
                  onChange={(e) => setBackgroundImageType(e.target.value)}
                  className="mr-2"
                />
                Image URL
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="upload"
                  checked={backgroundImageType === "upload"}
                  onChange={(e) => setBackgroundImageType(e.target.value)}
                  className="mr-2"
                />
                Upload Image
              </label>
            </div>
          </div>

          {backgroundImageType === "url" ? (
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="backgroundImageURL">
                Background Image URL
              </label>
              <input
                type="url"
                id="backgroundImageURL"
                value={backgroundImageURL}
                onChange={(e) => setBackgroundImageURL(e.target.value)}
                required={backgroundImageType === "url"}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="backgroundImage">
                Upload Background Image
              </label>
              <input
                type="file"
                id="backgroundImage"
                onChange={handleFileChange}
                required={backgroundImageType === "upload"}
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <p className="text-sm text-gray-500 mt-1">
                Max file size: 5MB. Allowed formats: JPEG, PNG, GIF, WEBP
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-bold py-2 px-4 rounded transition duration-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isSubmitting ? (id ? "Updating Slide..." : "Adding Slide...") : (id ? "Update Slide" : "Add Slide")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SlideForm;

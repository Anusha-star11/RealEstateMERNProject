import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "../url"; // Adjust based on your base URL setup

export const EditSlide = () => {
  const [slides, setSlides] = useState([]);
  const [editingSlide, setEditingSlide] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    backgroundImages: [], // Store both existing URLs and new File objects
  });
  const [imageOption, setImageOption] = useState("url"); // Track image input type
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`${baseURL}/api/slides`);
        if (response.ok) {
          const data = await response.json();
          setSlides(data);
        } else {
          console.error("Failed to fetch slides");
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };
    fetchSlides();
  }, []);

  const handleEdit = (id) => {
    const selectedSlide = slides.find((slide) => slide._id === id);
    setEditingSlide(selectedSlide);
    setFormData({
      title: selectedSlide.title || "",
      subtitle: selectedSlide.subtitle || "",
      backgroundImages: selectedSlide.backgroundImages || [], // Assuming array of URLs
    });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      backgroundImages: [...prevFormData.backgroundImages, ...selectedFiles],
    }));
  };

  const handleDeleteImage = (index) => {
    setFormData((prevFormData) => {
      const updatedImages = prevFormData.backgroundImages.filter((_, i) => i !== index);
      return { ...prevFormData, backgroundImages: updatedImages };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!editingSlide) return;

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("subtitle", formData.subtitle);

    formData.backgroundImages.forEach((image) => {
      if (image instanceof File) {
        formDataToSend.append("backgroundImages", image); // Append new files
      } else {
        formDataToSend.append("existingImages", image); // Append existing URLs
      }
    });

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/api/slides/${editingSlide._id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataToSend,
        credentials: "include",
      });

      if (response.ok) {
        const updatedSlide = await response.json();
        setSlides((prevSlides) =>
          prevSlides.map((slide) => (slide._id === updatedSlide._id ? updatedSlide : slide))
        );
        setEditingSlide(null);
        setFormData({
          title: "",
          subtitle: "",
          backgroundImages: [],
        });
        navigate("/slides");
      } else {
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Slide</h2>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      {editingSlide && (
        <form onSubmit={handleSaveChanges} encType="multipart/form-data" className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="subtitle" className="block text-sm font-bold mb-2">
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label htmlFor="backgroundImages" className="block text-sm font-bold mb-2">
              Upload Images
            </label>
            <input
              type="file"
              id="backgroundImages"
              name="backgroundImages"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              accept="image/*"
              multiple
            />
          </div>

          {formData.backgroundImages.length > 0 && (
            <div className="mt-4">
              <h3 className="block text-sm font-bold mb-2">Current Images:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {formData.backgroundImages.map((image, index) => (
                  <li key={index} className="flex flex-col items-center bg-gray-100 p-2 rounded-md">
                    {!(image instanceof File) ? (
                      <img
                        src={`${baseURL}/${image}`}
                        alt={`Slide Image ${index}`}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                    ) : (
                      <span className="mb-2 text-sm">{image.name}</span>
                    )}
                    <button
                      type="button"
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                      onClick={() => handleDeleteImage(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}

      <ul>
        {slides.map((slide) => (
          <li key={slide._id} className="mb-4 p-4 border rounded-lg">
            <h3 className="font-bold">{slide.title}</h3>
            <p>{slide.subtitle}</p>
            <button
              onClick={() => handleEdit(slide._id)}
              className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(slide._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditSlide;

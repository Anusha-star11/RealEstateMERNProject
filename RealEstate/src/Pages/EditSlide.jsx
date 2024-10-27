import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const EditSlide = () => {
  const [slides, setSlides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/slides");
        if (response.ok) {
          const data = await response.json();
          setSlides(data);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };
    fetchSlides();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-slide/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slide?")) return;

    try {
      const response = await fetch(`http://localhost:5001/api/slides/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSlides(slides.filter((slide) => slide._id !== id));
      } else {
        console.error("Failed to delete slide");
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Slides</h2>
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

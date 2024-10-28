import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditSlidesForm = () => {
  const [slides, setSlides] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState({}); // Track radio button selection per slide
  const [selectedFile, setSelectedFile] = useState({}); // Track file upload per slide

  // Fetch slides data
  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/slides');
      setSlides(response.data);

      // Initialize form data for each slide with default values
      const initialFormData = {};
      const initialOptionData = {};
      response.data.forEach((slide) => {
        initialFormData[slide._id] = {
          title: slide.title || '',
          subtitle: slide.subtitle || '',
          backgroundImageURL: slide.backgroundImage || '',
        };
        initialOptionData[slide._id] = 'url'; // Default option
      });
      setFormData(initialFormData);
      setSelectedOption(initialOptionData);
    } catch (error) {
      console.error('Error fetching slides:', error);
    }
  };

  // Handle form changes for each slide
  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
      },
    }));
  };

  // Handle radio button selection
  const handleOptionChange = (id, option) => {
    setSelectedOption((prev) => ({
      ...prev,
      [id]: option,
    }));
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        backgroundImageURL: '', // Clear URL if switching to upload
      },
    }));
  };

  // Handle file selection for each slide
  const handleFileChange = (e, id) => {
    setSelectedFile((prev) => ({
      ...prev,
      [id]: e.target.files[0],
    }));
  };

  // Save changes for a specific slide
  // Save changes for a specific slide
  const saveSlide = async (id) => {
    const slideData = formData[id];
    try {
      // Check if the upload option is selected and a file is available
      if (selectedOption[id] === 'upload' && selectedFile[id]) {
        const uploadData = new FormData();
        uploadData.append('backgroundImage', selectedFile[id]);
  
        // Upload image and get URL
        const uploadResponse = await axios.post('http://localhost:5001/api/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        slideData.backgroundImage = uploadResponse.data.imageUrl; // Update slide data with new image URL
      }
  
      // Save the slide data with either uploaded URL or URL entered manually
      await axios.put(`http://localhost:5001/api/slides/${id}`, {
        title: slideData.title,
        subtitle: slideData.subtitle,
        backgroundImage: selectedOption[id] === 'upload' ? slideData.backgroundImage : slideData.backgroundImageURL
      });
  
      // Update formData for the specific slide to reflect the newly saved data
      setFormData((prevData) => ({
        ...prevData,
        [id]: {
          ...prevData[id],
          backgroundImage: slideData.backgroundImage, // Update with new URL
        },
      }));
    } catch (error) {
      console.error('Error saving slide:', error);
    }
  };


  // Delete a slide
  const deleteSlide = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/slides/${id}`);
      setSlides(slides.filter((slide) => slide._id !== id));
    } catch (error) {
      console.error('Error deleting slide:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Edit Slides Form</h2>
      <form className="space-y-8">
        {slides.map((slide) => (
          <div key={slide._id} className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData[slide._id]?.title || ''} // Fallback to empty string
                onChange={(e) => handleInputChange(e, slide._id)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={formData[slide._id]?.subtitle || ''} // Fallback to empty string
                onChange={(e) => handleInputChange(e, slide._id)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium text-gray-700">Background Image</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`backgroundOption-${slide._id}`}
                    checked={selectedOption[slide._id] === 'url'}
                    onChange={() => handleOptionChange(slide._id, 'url')}
                  />
                  <span>Image URL</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`backgroundOption-${slide._id}`}
                    checked={selectedOption[slide._id] === 'upload'}
                    onChange={() => handleOptionChange(slide._id, 'upload')}
                  />
                  <span>Upload from Computer</span>
                </label>
              </div>
              {selectedOption[slide._id] === 'url' ? (
                <input
                  type="text"
                  name="backgroundImageURL"
                  value={formData[slide._id]?.backgroundImageURL || ''} // Fallback to empty string
                  onChange={(e) => handleInputChange(e, slide._id)}
                  placeholder="Enter image URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, slide._id)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => saveSlide(slide._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => deleteSlide(slide._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default EditSlidesForm;

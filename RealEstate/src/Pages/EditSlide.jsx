import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditSlidesForm = () => {
  const [slides, setSlides] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedFile, setSelectedFile] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/slides');
      setSlides(response.data);

      const initialFormData = {};
      const initialOptionData = {};
      response.data.forEach((slide) => {
        initialFormData[slide._id] = {
          title: slide.title || '',
          subtitle: slide.subtitle || '',
          backgroundImageURL: slide.backgroundImage || '',
        };
        initialOptionData[slide._id] = 'url';
      });
      setFormData(initialFormData);
      setSelectedOption(initialOptionData);
    } catch (error) {
      console.error('Error fetching slides:', error);
    }
  };

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

  const handleOptionChange = (id, option) => {
    setSelectedOption((prev) => ({
      ...prev,
      [id]: option,
    }));
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        backgroundImageURL: '',
      },
    }));
  };

  const handleFileChange = (e, id) => {
    setSelectedFile((prev) => ({
      ...prev,
      [id]: e.target.files[0],
    }));
  };

  const saveSlide = async (id) => {
    const slideData = formData[id];
    try {
      if (selectedOption[id] === 'upload' && selectedFile[id]) {
        const uploadData = new FormData();
        uploadData.append('backgroundImage', selectedFile[id]);

        const uploadResponse = await axios.post('http://localhost:5001/api/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        slideData.backgroundImage = uploadResponse.data.imageUrl;
      }

      await axios.put(`http://localhost:5001/api/slides/${id}`, {
        title: slideData.title,
        subtitle: slideData.subtitle,
        backgroundImage: selectedOption[id] === 'upload' ? slideData.backgroundImage : slideData.backgroundImageURL
      });

      setFormData((prevData) => ({
        ...prevData,
        [id]: {
          ...prevData[id],
          backgroundImage: slideData.backgroundImage,
        },
      }));

      setSuccessMessage('Slide updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving slide:', error);
    }
  };

  const deleteSlide = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/slides/${id}`);
      setSlides(slides.filter((slide) => slide._id !== id));
    } catch (error) {
      console.error('Error deleting slide:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full p-8 bg-white shadow-2xl rounded-lg">
        <h2 className="text-4xl font-semibold mb-6 text-center text-indigo-700">Edit Slides</h2>

        {successMessage && (
          <div className="mb-6 p-4 text-green-900 bg-green-100 border border-green-300 rounded-lg text-center animate-fade-in">
            {successMessage}
          </div>
        )}

        <form className="space-y-8">
          {slides.map((slide) => (
            <div key={slide._id} className="bg-gray-50 shadow rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-600">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData[slide._id]?.title || ''}
                  onChange={(e) => handleInputChange(e, slide._id)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-600">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData[slide._id]?.subtitle || ''}
                  onChange={(e) => handleInputChange(e, slide._id)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-600">Background Image</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`backgroundOption-${slide._id}`}
                      checked={selectedOption[slide._id] === 'url'}
                      onChange={() => handleOptionChange(slide._id, 'url')}
                    />
                    <span className="text-gray-600">Image URL</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`backgroundOption-${slide._id}`}
                      checked={selectedOption[slide._id] === 'upload'}
                      onChange={() => handleOptionChange(slide._id, 'upload')}
                    />
                    <span className="text-gray-600">Upload from Computer</span>
                  </label>
                </div>
                {selectedOption[slide._id] === 'url' ? (
                  <input
                    type="text"
                    name="backgroundImageURL"
                    value={formData[slide._id]?.backgroundImageURL || ''}
                    onChange={(e) => handleInputChange(e, slide._id)}
                    placeholder="Enter image URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, slide._id)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => saveSlide(slide._id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => deleteSlide(slide._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default EditSlidesForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../url';

const EditProjectForm = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedFile, setSelectedFile] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/projects`);
      setProjects(response.data);

      const initialFormData = {};
      const initialOptionData = {};
      response.data.forEach((project) => {
        initialFormData[project._id] = {
          title: project.title || '',
          description: project.description || '',
          image: project.image || '',
          imageURL: project.image || '', // Pre-fill image URL if available
        };
        initialOptionData[project._id] = 'url'; // Default to URL option
      });
      setFormData(initialFormData);
      setSelectedOption(initialOptionData);
    } catch (error) {
      console.error('Error fetching projects:', error);
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
        imageURL: '', // Reset URL when changing option
      },
    }));
  };

  const handleFileChange = (e, id) => {
    setSelectedFile((prev) => ({
      ...prev,
      [id]: e.target.files[0],
    }));
  };

  const saveProject = async (id) => {
    const projectData = formData[id];
    const updatedData = new FormData();

    try {
      // Append image based on selected option
      if (selectedOption[id] === 'upload' && selectedFile[id]) {
        updatedData.append('image', selectedFile[id]); // This must match multer's field name
      } else {
        updatedData.append('image', projectData.imageURL); // Use URL if no file
      }

      // Append other project data
      updatedData.append('title', projectData.title);
      updatedData.append('description', projectData.description);
      if (projectData.category) {
        updatedData.append('category', projectData.category);
      }

      await axios.put(`${baseURL}/api/projects/${id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Project updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear the message after 3 seconds
      fetchProjects(); // Refresh projects list after saving
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/projects/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
      setSuccessMessage('Project deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full p-8 bg-white shadow-2xl rounded-lg">
        <h2 className="text-4xl font-semibold mb-6 text-center text-indigo-700">Edit Projects</h2>

        {successMessage && (
          <div className="mb-6 p-4 text-green-900 bg-green-100 border border-green-300 rounded-lg text-center animate-fade-in">
            {successMessage}
          </div>
        )}

        <form className="space-y-8">
          {projects.map((project) => (
            <div key={project._id} className="bg-gray-50 shadow rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-600">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData[project._id]?.title || ''}
                  onChange={(e) => handleInputChange(e, project._id)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-600">Description</label>
                <textarea
                  name="description"
                  value={formData[project._id]?.description || ''}
                  onChange={(e) => handleInputChange(e, project._id)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-gray-600">Select Image Source</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`imageOption-${project._id}`}
                      checked={selectedOption[project._id] === 'url'}
                      onChange={() => handleOptionChange(project._id, 'url')}
                    />
                    <span className="text-gray-600">Image URL</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`imageOption-${project._id}`}
                      checked={selectedOption[project._id] === 'upload'}
                      onChange={() => handleOptionChange(project._id, 'upload')}
                    />
                    <span className="text-gray-600">Upload from Computer</span>
                  </label>
                </div>
                {selectedOption[project._id] === 'url' ? (
                  <input
                    type="text"
                    name="imageURL"
                    value={formData[project._id]?.imageURL || ''}
                    onChange={(e) => handleInputChange(e, project._id)}
                    placeholder="Enter image URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, project._id)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => saveProject(project._id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => deleteProject(project._id)}
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
//end

export default EditProjectForm;

import React from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel'; // Example carousel package
import 'react-multi-carousel/lib/styles.css';

const projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'Detailed description of Project 1.',
    highlights: ['Spacious rooms', 'Great views', 'Modern design'],
    amenities: ['Swimming pool', 'Gym', '24x7 Security'],
    images: [
      'https://via.placeholder.com/800x400?text=Project+1+Image+1',
      'https://via.placeholder.com/800x400?text=Project+1+Image+2',
    ],
  },
  // Other project data...
];

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find(proj => proj.id === parseInt(id));

  if (!project) return <div>Project not found</div>;

  return (
    <div>
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-3xl">{project.title}</h1>
      </header>

      {/* Carousel Section */}
      <section className="p-4">
        <Carousel responsive={{}}>
          {project.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Project ${project.title} Image ${index + 1}`} className="w-full h-96 object-cover" />
            </div>
          ))}
        </Carousel>
      </section>

      {/* Highlights Section */}
      <section className="p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Highlights</h2>
        <ul>
          {project.highlights.map((highlight, index) => (
            <li key={index} className="mb-2">
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      {/* Amenities Section */}
      <section className="p-4 bg-white">
        <h2 className="text-2xl font-bold mb-4">Amenities</h2>
        <ul>
          {project.amenities.map((amenity, index) => (
            <li key={index} className="mb-2">
              {amenity}
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} V9 Properties. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ProjectDetails

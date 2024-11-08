import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell, faRunning, faSwimmer, faCar, faDice, faShieldAlt, faChild, faTableTennis } from '@fortawesome/free-solid-svg-icons'; 
import 'react-multi-carousel/lib/styles.css';
import baseURL from '../url';

export const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching project with ID:', id);
        const response = await fetch(`${baseURL}/api/projects/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }

        const data = await response.json();
        console.log('Fetched project data:', data);
        
        if (!data) {
          throw new Error('No project found');
        }

        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError(error.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder-image.jpg';
    return imageUrl.startsWith('http') 
      ? imageUrl 
      : `${baseURL}${imageUrl}`;
  };

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-700 text-xl font-semibold mb-2">Error Loading Project</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md">
          <h2 className="text-yellow-700 text-xl font-semibold mb-2">Project Not Found</h2>
          <p className="text-yellow-600">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Carousel Section */}
      <section className="h-screen w-full snap-start">
        <Carousel 
          responsive={responsive} 
          className="h-full"
          infinite={true}
          showDots={true}
          autoPlay={true}
          autoPlaySpeed={5000}
        >
          <div className="h-full relative">
            <img 
              src={getImageUrl(project.image)}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image failed to load:', project.image);
                e.target.src = '/placeholder-image.jpg';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>
        </Carousel>
      </section>

      {/* Highlights Section */}
      <section className="h-screen w-full snap-start bg-gray-100 flex flex-col md:flex-row items-center justify-center p-4 md:p-10">
        <motion.div
          className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={getImageUrl(project.image)}
            alt="Highlight Image"
            className="rounded-lg w-full max-w-md md:max-w-lg h-auto object-cover"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 p-4 md:p-6"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Highlights</h2>
          <ul className="custom-list text-base sm:text-lg">
            <motion.li className="mb-4 flex items-center" whileHover={{ scale: 1.05 }}>
              <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
              {project.title}
            </motion.li>
            <motion.li className="mb-4 flex items-center" whileHover={{ scale: 1.05 }}>
              <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
              {project.description}
            </motion.li>
            <motion.li className="mb-4 flex items-center" whileHover={{ scale: 1.05 }}>
              <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
              {project.category}
            </motion.li>
          </ul>
        </motion.div>
      </section>

      {/* Amenities Section */}
      <section className="h-screen w-full snap-start bg-white p-4 sm:p-6 flex flex-col justify-center">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">Our Amenities</h2>
          <p className="text-lg sm:text-xl mt-2">Amenities that Define Excellence</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-7xl mx-auto px-2 sm:px-4">
          {[
            { icon: faDice, title: "Indoor Games" },
            { icon: faTableTennis, title: "Badminton Court" },
            { icon: faRunning, title: "Jogging Track" },
            { icon: faDumbbell, title: "Gym" },
            { icon: faSwimmer, title: "Swimming Pool" },
            { icon: faShieldAlt, title: "24x7 Security" },
            { icon: faChild, title: "Kid's Play Area" },
            { icon: faCar, title: "Parking" },
          ].map((amenity, index) => (
            <motion.div
              key={index}
              className="p-3 sm:p-4 bg-gray-50 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FontAwesomeIcon icon={amenity.icon} className="text-2xl sm:text-3xl md:text-4xl text-gray-500 mb-2" />
              <h3 className="text-xs sm:text-sm md:text-base font-semibold">{amenity.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
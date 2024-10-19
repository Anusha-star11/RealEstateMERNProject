import React from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell, faRunning, faSwimmer, faCar, faDice, faShieldAlt, faChild, faTableTennis } from '@fortawesome/free-solid-svg-icons'; 
import 'react-multi-carousel/lib/styles.css';

export const ProjectDetails = () => {
  const { id } = useParams();

  const projects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://storage.googleapis.com/a1aa/image/arpm9V3KVyZZNhGujkQ6M5wfSHJ5Enpv9MNRQclcuceVm7mTA.jpg',
      category: 'Apartments',
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://storage.googleapis.com/a1aa/image/npBMWYBfpQXXGSV93VVOlqPKHhefVhfeQW86jn9Hr8FAYc3cC.jpg',
      category: 'Villas',
    },
    {
      id: 3,
      title: 'Project 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://storage.googleapis.com/a1aa/image/mSRcUla98B44DN3jJ7Ej0e6uYkLv1IjrwFFQJhFIfN4co7mTA.jpg',
      category: 'Community',
    },
    {
      id: 4,
      title: 'Project 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://storage.googleapis.com/a1aa/image/kpffWOTdkXpLpUgCBkhaHmfjxuTbqZ0JKK1e8v5FeKHb7c3cC.jpg',
      category: 'Apartments',
    },
    {
      id: 5,
      title: 'Project 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://storage.googleapis.com/a1aa/image/Uxh9jzjl8uYxHxAMO91trj84nERoIe88dnGMBKI8ZIl7wdzJA.jpg',
      category: 'Villas',
    },
    {
      id: 6,
      title: 'Project 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://storage.googleapis.com/a1aa/image/oLKo17S29b7zMtWw53BJhIdMfP3nbTNA3W0vxefp0KYCQ3NnA.jpg',
      category: 'Community',
    },
    // ... other projects
  ];

  const project = projects.find(proj => proj.id === parseInt(id));

  if (!project) {
    return <div>Project not found</div>;
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div>
      {/* Header */}
      {/* <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-3xl">{project.title}</h1>
      </header> */}

      {/* Carousel Section */}
      <section className="p-4">
        <Carousel responsive={responsive}>
          <div>
            <img src={project.image} alt={`Project ${project.title}`} className="w-full h-96 object-cover" />
          </div>
        </Carousel>
      </section>

      
 <section id="highlights" className="min-h-screen bg-gray-100 p-4 sm:p-10 flex flex-col md:flex-row items-center justify-between">
    
    {/* Image Section with Scroll Animation */}
     <motion.div
      className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.img
        src="https://plus.unsplash.com/premium_photo-1661963546658-3bb26361ca54?q=80&w=1562&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Highlight Image"
        className="rounded-lg w-full max-w-md md:max-w-lg h-auto object-cover"
      />
    </motion.div>

    {/* Text Section with Scroll Animation */}
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
          Spacious living areas designed for comfort and style.
        </motion.li>
        <motion.li className="mb-4 flex items-center" whileHover={{ scale: 1.05 }}>
          <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
          Top-tier appliances and premium quality materials throughout.
        </motion.li>
        <motion.li className="mb-4 flex items-center" whileHover={{ scale: 1.05 }}>
          <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
          Elegant interiors with contemporary design aesthetics.
        </motion.li>
        <motion.li className="mb-4 flex items-center" whileHover={{ scale: 1.05 }}>
          <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
          Exclusive access to world-class amenities and green spaces.
        </motion.li>
      </ul>
    </motion.div>

  </section>

  <section id="amenities" className="min-h-screen bg-gray-100 p-4 sm:p-10">
    {/* Title Section with Scroll Animation */}
    <motion.div
      className="text-center mb-10"
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold">Our Amenities</h2>
      <p className="text-lg sm:text-xl mt-2">Amenities that Define Excellence</p>
    </motion.div>

    {/* Amenities Grid with Scroll Animation */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 max-w-6xl mx-auto">
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
          className="p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }} // Slight delay for staggered animation
          viewport={{ once: true }}
        >
          <FontAwesomeIcon icon={amenity.icon} className="text-4xl sm:text-6xl text-gray-500 mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold">{amenity.title}</h3>
        </motion.div>
      ))}
    </div>
  </section>


      {/* Description Section */}
      {/* <section className="p-4 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p>{project.description}</p>
      </section> */}

      {/* Category Section */}
      {/* <section className="p-4 bg-white">
        <h2 className="text-2xl font-bold mb-4">Category</h2>
        <p>{project.category}</p>
      </section> */}

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} V9 Properties. All Rights Reserved.
      </footer> */}
    </div>
  );
};

export default ProjectDetails;
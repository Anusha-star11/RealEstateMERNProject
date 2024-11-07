import React, { useEffect,useState }from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell, faRunning, faSwimmer, faCar, faDice, faShieldAlt, faChild, faTableTennis } from '@fortawesome/free-solid-svg-icons'; 
import 'react-multi-carousel/lib/styles.css';

export const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/projects/${id}`);
        if (response.ok) {
          const data = await response.json();
         
          setProjects(data); // Set the fetched projects
        } else {
          console.error("Failed to fetch projects:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchProjects();
  }, [id]);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    return imageUrl.startsWith('http') 
      ? imageUrl 
      : `http://localhost:5001${imageUrl}`;
  };


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
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Carousel Section */}
      <section className="h-screen w-full snap-start">
        <Carousel responsive={responsive} className="h-full">
          <div className="h-full">
            <img src={getImageUrl(projects.image)} alt={`Project ${projects.title}`} className="w-full h-full object-cover" />
          </div>
          {/* Add more carousel items as needed */}
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
            src="https://plus.unsplash.com/premium_photo-1661963546658-3bb26361ca54?q=80&w=1562&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
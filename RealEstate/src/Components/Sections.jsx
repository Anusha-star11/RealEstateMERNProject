import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell, faRunning, faSwimmer, faCar, faDice, faShieldAlt, faChild, faTableTennis } from '@fortawesome/free-solid-svg-icons'; 
import { faBriefcase, faProjectDiagram, faUsers, faAward, faSmile, faGlobe } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react'; // Import the Phone icon

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Resale / Land Owner Sale",
      subtitle: "Exclusive Realty",
      backgroundImage: "https://media.istockphoto.com/id/2155901088/photo/exterior-view-of-a-contemporary-new-home-in-los-angeles.jpg?s=1024x1024&w=is&k=20&c=TUqgqAPUlBrs2kaZFN6dkUNyEcrkNclVh3f-p7vcQNU=",
    },
    {
      title: "Land Owner Sale",
      subtitle: "Villas",
      backgroundImage: "https://media.istockphoto.com/id/2155900028/photo/modern-new-construction-home-in-los-angeles.jpg?s=1024x1024&w=is&k=20&c=sG83gG3AQdN13hHyyL9ACJaPHiR9bNW393woWisfY9A=",
    },
    {
      title: "Resale / Land Owner Sale",
      subtitle: "Exclusive Realty",
      backgroundImage: "https://media.istockphoto.com/id/1498811925/photo/real-estate-agent-or-real-estate-agent-was-holding-the-key-to-the-new-landlord-tenant-or.jpg?s=1024x1024&w=is&k=20&c=_SSNLW2TNTL03oHWFAVbKWB5yLFH0LUqLSuq5M6B3yQ=",
    },
    // Add more slides as needed
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000); // Auto-advance every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.backgroundImage}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-center">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 text-center">
                {slide.subtitle}
              </p>
              <a 
                href="tel:+919912344477" 
                className="bg-[#f2d39a] text-[#365359] font-bold py-2 px-4 rounded text-sm sm:text-base transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#e6c38c] flex items-center"
              >
                <Phone size={20} className="mr-2" />
                Book a Visit
              </a>
            </div>
          </div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hidden sm:block hover:bg-opacity-75 transition-all"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hidden sm:block hover:bg-opacity-75 transition-all"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};



export const Overview = () => (
  <section
    id="overview"
    className="min-h-screen bg-white p-4 sm:p-10 flex flex-col md:flex-row items-center justify-between"
  >
    {/* Text Section with Scroll Animation */}
    <motion.div
      className="w-full md:w-1/2 p-4 md:p-6 mb-6 md:mb-0"
      initial={{ opacity: 0, x: -100, rotateY: 15, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Us</h2>
      <p className="text-base sm:text-lg mb-6">
        Our real estate offers prime locations and modern designs to suit your lifestyle. Whether
        you're looking for a luxurious villa, a family home, or a smart apartment, we provide
        properties that blend comfort, functionality, and elegance. With state-of-the-art
        amenities and well-connected surroundings, you'll find the perfect space that matches your
        dreams and aspirations.
      </p>
      <p className="text-base sm:text-lg">
        Our projects are designed with sustainability in mind, featuring eco-friendly materials,
        energy-efficient designs, and green spaces that contribute to a healthier environment for
        you and your family. Explore our exclusive offerings and discover the home of your future.
      </p>
    </motion.div>

    {/* Image Section with Scroll and Hover Animation */}
    <motion.div
      className="w-full md:w-1/2 flex justify-center"
      initial={{ opacity: 0, x: 100, rotateY: -15, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.img
        src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Real Estate Overview"
        className="rounded-lg w-full max-w-md md:max-w-lg h-auto object-cover transform scale-90 hover:scale-100 transition-transform duration-500"
        whileHover={{ scale: 1.1 }}
      />
    </motion.div>
  </section>
);


export const Projects = () => {
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const categories = [
    { label: 'ALL', value: 'All' },
    { label: 'APPARTMENTS', value: 'Apartments' },
    { label: 'VILLAS', value: 'Villas' },
    { label: 'COMMUNITY', value: 'Community' }
  ];

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
  ];

  const filteredProjects = categoryFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === categoryFilter);

  return (
    <section id="projects" className="py-12 bg-gray-100">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Catalogue</h2>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setCategoryFilter(category.value)}
              className={`px-4 py-2 mx-2 text-sm font-medium rounded-full ${
                categoryFilter === category.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              } transition-colors duration-300`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-lg shadow-md relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }} // Starting state: slightly below and transparent
              whileInView={{ opacity: 1, y: 0 }} // End state: fully visible and in position
              transition={{ duration: 0.9, ease: 'easeOut' }} // Animation speed and easing
              viewport={{ once: true }} // Ensures the animation only happens once
            >
              {/* Image with title and description overlay */}
              <Link to={`/project/${project.id}`}>
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover mb-2 rounded-lg transition-transform duration-500 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                  <p className="text-sm">{project.description}</p>
                </motion.div>
              </div>
              </Link>

              {/* Dancing WhatsApp Icon */}
              <a
                href={`https://api.whatsapp.com/send?phone=919912344477&text=I%20am%20interested%20in%20${project.title}%2C%20could%20you%20please%20contact%20me%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 animate-bounce text-green-500"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// export const Highlights = () => (
//   <section id="highlights" className="min-h-screen bg-gray-100 p-4 sm:p-10 flex flex-col md:flex-row items-center justify-between">
    
//     {/* Image Section with Scroll Animation */}
//     <motion.div
//       className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0"
//       initial={{ opacity: 0, x: -100 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       <motion.img
//         src="https://plus.unsplash.com/premium_photo-1661963546658-3bb26361ca54?q=80&w=1562&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Highlight Image"
//         className="rounded-lg w-full max-w-md md:max-w-lg h-auto object-cover"
//       />
//     </motion.div>

//     {/* Text Section with Scroll Animation */}
//     <motion.div
//       className="w-full md:w-1/2 p-4 md:p-6"
//       initial={{ opacity: 0, x: 100 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       <h2 className="text-3xl sm:text-4xl font-bold mb-4">Highlights</h2>
//       <ul className="custom-list text-base sm:text-lg">
//         <motion.li className="mb-4 flex items-center" whileHover={{ scale: 1.05 }}>
//           <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
//           Spacious living areas designed for comfort and style.
//         </motion.li>
//         <motion.li className="mb-4 flex items-center" whileHover={{ scale: 1.05 }}>
//           <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
//           Top-tier appliances and premium quality materials throughout.
//         </motion.li>
//         <motion.li className="mb-4 flex items-center" whileHover={{ scale: 1.05 }}>
//           <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
//           Elegant interiors with contemporary design aesthetics.
//         </motion.li>
//         <motion.li className="mb-4 flex items-center" whileHover={{ scale: 1.05 }}>
//           <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
//           Exclusive access to world-class amenities and green spaces.
//         </motion.li>
//       </ul>
//     </motion.div>

//   </section>
// );


export const Achievements = () => {
  const achievementData = [
    { icon: faBriefcase, title: 'Years of Experience', value: 10, bgColor: 'from-[#3a5260] to-[#2c3e50]' },
    { icon: faProjectDiagram, title: 'Projects Completed', value: 120, bgColor: 'from-[#4a6572] to-[#344955]' },
    { icon: faUsers, title: 'Clients Worked With', value: 50, bgColor: 'from-[#5a7682] to-[#40545e]' },
    { icon: faSmile, title: 'Satisfied Customers', value: 500, bgColor: 'from-[#6a8792] to-[#4c616b]' },
  ];

  return (
    <section id="achievements" className="py-16 bg-gray-100 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#365359]">Our Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {achievementData.map((achievement, index) => (
            <motion.div
              key={index}
              className={`p-6 bg-[#365359] rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FontAwesomeIcon icon={achievement.icon} className="text-5xl mb-4 text-[#f2d39a]" />
              <CountUp
                end={achievement.value}
                duration={2.5}
                className="text-4xl sm:text-5xl font-bold text-[#f2d39a]"
              />
              <p className="mt-3 text-lg sm:text-xl text-[#f2d39a] opacity-90">{achievement.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};




export const Amenities = () => (
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
);

export const Contact = () => (
  <section id="contact" className="min-h-screen bg-white p-4 sm:p-10 flex flex-col lg:flex-row justify-between items-stretch">
    
    {/* Contact Details Section with Scroll Animation */}
    <motion.div
      className="w-full lg:w-1/2 p-6 sm:p-8 bg-gray-200 text-[#365359] rounded-lg shadow-xl flex flex-col justify-center"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center border-b pb-2 border-[#365359]">Santosh Gupta Garlapati</h3>
      <div className="space-y-4 sm:space-y-6 text-base sm:text-lg">
        <div>
          <h4 className="text-lg sm:text-xl font-semibold">Phone:</h4>
          <p>+919912344477</p>
        </div>
        <div>
          <h4 className="text-lg sm:text-xl font-semibold">Email:</h4>
          <p>developer@example.com</p>
        </div>
        <div>
          <h4 className="text-lg sm:text-xl font-semibold">Office Address:</h4>
          <p>
            1234 Real Estate Avenue, Suite 500<br />
            City, State, ZIP Code
          </p>
        </div>
        <div>
          <h4 className="text-lg sm:text-xl font-semibold">Working Hours:</h4>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
        </div>
        <div className="mt-6 sm:mt-8 flex justify-center">
  <button className="bg-[#f2d39a] hover:bg-[#e6c08a] text-[#365359] py-2 sm:py-3 px-6 sm:px-8 rounded-full font-bold shadow-md text-sm sm:text-base">
    <a href="tel:+919912344477">Call Now</a>
  </button>
</div>
      </div>
    </motion.div>

    {/* Google Map Section with Scroll Animation */}
    <motion.div
      className="w-full lg:w-1/2 p-6 sm:p-8 bg-white rounded-lg shadow-xl flex justify-center items-center"
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-full h-full">
        <iframe
          title="Gachibowli Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8498970533634!2d78.35420987462487!3d17.446043788090034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93bdaafdc5d1%3A0xe1517c7804210e33!2sGachibowli%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1631003576350!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </motion.div>

  </section>
);

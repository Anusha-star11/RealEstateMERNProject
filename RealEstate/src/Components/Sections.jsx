import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faDumbbell, faRunning, faSwimmer, faCar, faDice, faShieldAlt, faChild, faTableTennis } from '@fortawesome/free-solid-svg-icons'; 

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
      subtitle: "Realty",
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
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded text-sm sm:text-base transition duration-300 ease-in-out transform hover:scale-105">
              Book Now
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hidden sm:block"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hidden sm:block"
      >
        &#10095;
      </button>
    </div>
    </section>
  );
};



export const Overview = () => (
  <section id="overview" className="min-h-screen bg-white p-4 sm:p-10 flex flex-col md:flex-row items-center justify-between">
    <div className="w-full md:w-1/2 p-4 md:p-6 mb-6 md:mb-0">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">Overview</h2>
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
    </div>
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Real Estate Overview"
        className="rounded-lg w-full max-w-md md:max-w-lg h-auto object-cover"
      />
    </div>
  </section>
);

export const Highlights = () => (
  <section id="highlights" className="min-h-screen bg-gray-100 p-4 sm:p-10 flex flex-col md:flex-row items-center justify-between">
    <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
      <img
        src="https://plus.unsplash.com/premium_photo-1661963546658-3bb26361ca54?q=80&w=1562&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Highlight Image"
        className="rounded-lg w-full max-w-md md:max-w-lg h-auto object-cover"
      />
    </div>
    <div className="w-full md:w-1/2 p-4 md:p-6">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">Highlights</h2>
      <ul className="custom-list text-base sm:text-lg">
        <li className="mb-4 flex items-center">
          <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
          Spacious living areas designed for comfort and style.
        </li>
        <li className="mb-4 flex items-center">
          <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
          Top-tier appliances and premium quality materials throughout.
        </li>
        <li className="mb-4 flex items-center">
          <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
          Elegant interiors with contemporary design aesthetics.
        </li>
        <li className="mb-4 flex items-center">
          <FontAwesomeIcon icon={faArrowCircleRight} className="mr-4 text-gray-600" />
          Exclusive access to world-class amenities and green spaces.
        </li>
      </ul>
    </div>
  </section>
);

export const Amenities = () => (
  <section id="amenities" className="min-h-screen bg-gray-100 p-4 sm:p-10">
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl font-bold">Our Amenities</h2>
      <p className="text-lg sm:text-xl mt-2">Amenities that Define Excellence</p>
    </div>
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
        <div key={index} className="p-4 sm:p-6 bg-gray-50 rounded-lg shadow-lg text-center">
          <FontAwesomeIcon icon={amenity.icon} className="text-4xl sm:text-6xl text-gray-500 mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold">{amenity.title}</h3>
        </div>
      ))}
    </div>
  </section>
);

export const Contact = () => (
  <section id="contact" className="min-h-screen bg-gray-100 p-4 sm:p-10 flex flex-col lg:flex-row justify-between">
    <div className="w-full lg:w-1/2 p-4 lg:p-6 mb-6 lg:mb-0">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Developer</h2>
      <p className="text-base sm:text-lg mb-6">
        We are a leading real estate development company focused on delivering world-class living spaces 
        with modern designs and cutting-edge amenities. Our team is committed to providing luxurious homes
        that cater to the evolving needs of our customers. With years of experience in the industry, 
        we bring unmatched expertise in crafting properties that enhance both lifestyle and investment potential.
      </p>
      <p className="text-base sm:text-lg mb-6">
        Our philosophy centers around innovation, sustainability, and excellence. We have delivered a wide array of 
        residential, commercial, and mixed-use properties that meet the highest standards of quality. 
        Our aim is to create spaces that inspire joy, enhance well-being, and deliver long-term value to our customers.
      </p>
    </div>
    <div className="w-full lg:w-1/2 p-6 sm:p-8 bg-gradient-to-r from-gray-600 to-gray-400 text-white rounded-lg shadow-xl">
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center border-b pb-2 border-white">Developer Contact Details</h3>
      <div className="space-y-4 sm:space-y-6 text-base sm:text-lg">
        <div>
          <h4 className="text-lg sm:text-xl font-semibold">Phone:</h4>
          <p>+919123456789</p>
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
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 sm:py-3 px-6 sm:px-8 rounded-full font-bold shadow-md text-sm sm:text-base">
            <a href="tel:+919230967484">Call Now</a>
          </button>
        </div>
      </div>
    </div>
  </section>
);
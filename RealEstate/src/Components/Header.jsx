import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo1 from '../assets/logo1.jpg';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaPinterest } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigateToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="w-full">
      {/* Red Header */}
      <div className="bg-[#f85a3f] py-2 px-4 text-white text-sm md:text-base">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-4">
            <FaPhoneAlt />
            <span>+91-7660005500</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <FaEnvelope />
            <span>sales@rajapushpa.in</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <FaFacebook />
            <FaTwitter />
            <FaLinkedin />
            <FaYoutube />
            <FaPinterest />
          </div>
        </div>
      </div>

      {/* White Header */}
      <div className="bg-white shadow-lg">
        <nav className="container mx-auto px-4 flex items-center justify-between h-20">
          {/* Left side - Logo */}
          <Link
            to="/"
            className="focus:outline-none flex-shrink-0 flex items-center justify-start overflow-hidden ml-10 pr-5 pl-5"
          >
            <img 
              src={logo1} 
              alt="V9 Properties Logo" 
              className="h-[100px] w-[211.8px] max-h-full"
            />
          </Link>

          {/* Right side - Navigation Menu */}
          <div className="flex-shrink-0 flex justify-end items-center h-full mr-10">
            <div className="hidden md:flex space-x-6 text-[#1d2d3c] font-medium">
              <button
                onClick={() => navigateToSection("home")}
                className="hover:text-[#464ba6] text-base whitespace-nowrap transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => navigateToSection("projects")}
                className="hover:text-[#464ba6] text-base whitespace-nowrap transition-colors duration-300"
              >
                Projects
              </button>
              <button
                onClick={() => navigateToSection("overview")}
                className="hover:text-[#464ba6] text-base whitespace-nowrap transition-colors duration-300"
              >
                About Us
              </button>
              <button
                onClick={() => navigateToSection("achievements")}
                className="hover:text-[#464ba6] text-base whitespace-nowrap transition-colors duration-300"
              >
                Achievements
              </button>
              <button
                onClick={() => navigateToSection("contact")}
                className="hover:text-[#464ba6] text-base whitespace-nowrap transition-colors duration-300"
              >
                Contact Us
              </button>
            </div>

            {/* Hamburger Menu for Mobile View */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-[#1d2d3c] focus:outline-none p-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1d2d3c] text-[#f2d39a] p-4 absolute top-full left-0 right-0">
          <button onClick={() => navigateToSection("home")} className="block py-2 w-full text-left hover:text-white transition-colors duration-300">
            Home
          </button>
          <button onClick={() => navigateToSection("projects")} className="block py-2 w-full text-left hover:text-white transition-colors duration-300">
            Projects
          </button>
          <button onClick={() => navigateToSection("overview")} className="block py-2 w-full text-left hover:text-white transition-colors duration-300">
            About Us
          </button>
          <button onClick={() => navigateToSection("achievements")} className="block py-2 w-full text-left hover:text-white transition-colors duration-300">
            Achievements
          </button>
          <button onClick={() => navigateToSection("contact")} className="block py-2 w-full text-left hover:text-white transition-colors duration-300">
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
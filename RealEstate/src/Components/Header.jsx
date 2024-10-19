import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/logo.png'

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrollY > 50 ? "bg-[#365359]" : "bg-transparent"
      }`}
    >
      <nav className="w-full flex items-center justify-between h-14 md:h-16 lg:h-18">
        {/* Left side - Logo */}
        <Link
          to="/"
          className="focus:outline-none h-full flex-shrink-0 flex items-center justify-start pl-2 pr-4 overflow-hidden"
          style={{ maxWidth: 'calc(100vw - 200px)' }}
        >
          <img 
            src={logo} 
            alt="V9 Properties Logo" 
            className="h-auto w-auto max-h-full"
            style={{ maxWidth: '100%', objectFit: 'contain' }}
          />
        </Link>

        {/* Right side - Navigation Menu */}
        <div className="flex-shrink-0 flex justify-end items-center h-full">
          <div className="hidden md:flex space-x-3 lg:space-x-6 text-[#f2d39a] px-4">
            <button
              onClick={() => navigateToSection("home")}
              className="hover:text-white text-sm lg:text-base whitespace-nowrap transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => navigateToSection("projects")}
              className="hover:text-white text-sm lg:text-base whitespace-nowrap transition-colors duration-300"
            >
              Projects
            </button>
            <button
              onClick={() => navigateToSection("overview")}
              className="hover:text-white text-sm lg:text-base whitespace-nowrap transition-colors duration-300"
            >
              About Us
            </button>
            <button
              onClick={() => navigateToSection("achievements")}
              className="hover:text-white text-sm lg:text-base whitespace-nowrap transition-colors duration-300"
            >
              Achievements
            </button>
            <button
              onClick={() => navigateToSection("contact")}
              className="hover:text-white text-sm lg:text-base whitespace-nowrap transition-colors duration-300"
            >
              Contact Us
            </button>
          </div>

          {/* Hamburger Menu for Mobile View */}
          <div className="md:hidden px-4">
            <button onClick={toggleMenu} className="text-[#f2d39a] focus:outline-none">
              <svg
                className="w-5 h-5"
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
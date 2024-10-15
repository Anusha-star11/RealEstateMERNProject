import React, { useState, useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const headerHeight = document.querySelector("header").offsetHeight;
    window.scrollTo({
      top: section.offsetTop - headerHeight,
      behavior: "smooth",
    });
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
        scrollY > 50 ? "bg-[#1d2d3c]" : "bg-transparent"
      }`}
    >
      <nav className="w-full flex items-center justify-between">
        {/* Left side - Full Yellow Background for Logo */}
        <div className="bg-[#edcd20] h-full flex items-center justify-center">
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl font-bold text-[#1d2d3c] focus:outline-none w-[250px] h-[80px] flex items-center justify-center"
          >
            V9 Properties
          </button>
        </div>

        {/* Right side - Navigation Menu */}
        <div className="flex-grow flex justify-end items-center h-full">
          <div className="hidden md:flex space-x-6 text-white px-4">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-[#edcd20]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="hover:text-[#edcd20]"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("overview")}
              className="hover:text-[#edcd20]"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("achievements")}
              className="hover:text-[#edcd20]"
            >
              Achievements
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-[#edcd20]"
            >
              Contact Us
            </button>
          </div>

          {/* Hamburger Menu for Mobile View */}
          <div className="md:hidden px-4">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1d2d3c] text-white p-4 absolute top-full left-0 right-0">
          <button onClick={() => scrollToSection("home")} className="block py-2 w-full text-left">
            Home
          </button>
          <button onClick={() => scrollToSection("projects")} className="block py-2 w-full text-left">
            Projects
          </button>
          <button onClick={() => scrollToSection("overview")} className="block py-2 w-full text-left">
            About Us
          </button>
          <button onClick={() => scrollToSection("achievements")} className="block py-2 w-full text-left">
            Achievements
          </button>
          <button onClick={() => scrollToSection("contact")} className="block py-2 w-full text-left">
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
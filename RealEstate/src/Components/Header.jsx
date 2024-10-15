import React, { useState, useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0); // State to track scroll position

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle smooth scrolling with offset
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const headerHeight = document.querySelector("header").offsetHeight;
    window.scrollTo({
      top: section.offsetTop - headerHeight,
      behavior: "smooth",
    });
  };

  // Add scroll event listener to change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // Update scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []);

  return (
    <header
      className={`${
        scrollY > 50 ? "bg-gray-600" : "bg-transparent"
      } text-white fixed top-0 left-0 right-0 z-50 transition-colors duration-300`}
    >
      <nav className="container mx-auto p-4 flex justify-between items-center">
        {/* Make V9 Properties clickable to scroll to home */}
        <button
          onClick={() => scrollToSection("home")}
          className="text-xl font-bold focus:outline-none"
        >
          V9 Properties
        </button>
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:underline"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="hover:underline"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("overview")}
            className="hover:underline"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("achievements")}
            className="hover:underline"
          >
            Achievements
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:underline"
          >
            Contact Us
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
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
      </nav>
      {isOpen && (
        <div className="md:hidden bg-blue-600 text-white p-4">
          <button onClick={() => scrollToSection("home")} className="block py-2">
            Home
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="block py-2"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("overview")}
            className="block py-2"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection("achievements")}
            className="block py-2"
          >
            Achievements
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="block py-2"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

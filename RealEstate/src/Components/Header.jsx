import React, { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">RealEstateApp</h1>
        <div className="hidden md:flex space-x-6">
          <button onClick={() => scrollToSection("home")} className="hover:underline">Home</button>
          <button onClick={() => scrollToSection("projects")} className="hover:underline">Projects</button>
          <button onClick={() => scrollToSection("overview")} className="hover:underline">About Us</button>
          <button onClick={() => scrollToSection("achievements")} className="hover:underline">Achievements</button>
          {/* <button onClick={() => scrollToSection("amenities")} className="hover:underline">Amenities</button> */}
          <button onClick={() => scrollToSection("contact")} className="hover:underline">Contact Us</button>
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
          <button onClick={() => scrollToSection("home")} className="block py-2">Home</button>
          <button onClick={() => scrollToSection("projects")} className="block py-2">Projects</button>
          <button onClick={() => scrollToSection("overview")} className="block py-2">About Us</button>
          <button onClick={() => scrollToSection("achievements")} className="block py-2">Achievements</button>
          {/* <button onClick={() => scrollToSection("amenities")} className="block py-2">Amenities</button> */}
          <button onClick={() => scrollToSection("contact")} className="block py-2">Contact Us</button>
        </div>
      )}
    </header>
  );
};

export default Header;

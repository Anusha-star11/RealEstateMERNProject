import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">V9 Properties</h2>
          <p className="text-white">
            We offer a wide range of real estate properties, from luxury villas to smart apartments. Find your dream home with V9 Properties.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:underline">Home</a>
            </li>
            <li>
              <a href="#projects" className="hover:underline">Projects</a>
            </li>
            <li>
              <a href="#overview" className="hover:underline">About Us</a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-white">1234 Real Estate Avenue, Suite 500</p>
          <p className="text-white">City, State, ZIP Code</p>
          <p className="text-white">Phone: +919123456789</p>
          <p className="text-white">Email: developer@example.com</p>

          {/* Social Media Icons */}
          <div className="mt-4 space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="text-white hover:text-blue-500 text-2xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className="text-white hover:text-blue-400 text-2xl" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="text-white hover:text-blue-700 text-2xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="text-white hover:text-pink-500 text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} V9 Properties. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

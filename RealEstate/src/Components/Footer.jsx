import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <div className="col-span-1">
            <h2 className="text-xl font-bold mb-4">V9 Properties</h2>
            <p className="text-sm text-gray-300">
              We offer a wide range of real estate properties, from luxury villas to smart apartments. Find your dream home with V9 Properties.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#projects" className="hover:underline">Projects</a></li>
              <li><a href="#overview" className="hover:underline">About Us</a></li>
              <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <address className="text-sm text-gray-300 not-italic space-y-1">
              <p>1234 Real Estate Avenue, Suite 500</p>
              <p>City, State, ZIP Code</p>
              <p>Phone: +919123456789</p>
              <p>Email: developer@example.com</p>
            </address>
          </div>

          {/* Social Media Icons */}
          <div className="mt-4 lg:mt-0">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} V9 Properties. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

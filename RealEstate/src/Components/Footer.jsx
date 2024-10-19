import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, X } from 'lucide-react';

const Popup = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#f2d39a] text-[#365359] p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Subscription Successful</h3>
          <button onClick={onClose} className="text-[#365359] hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p>{message}</p>
        <button 
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-[#365359] text-[#f2d39a] rounded hover:bg-opacity-90 transition-colors w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Footer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsPopupOpen(true);
      setEmail(''); // Clear the email input
    }
  };

  return (
    <footer className="bg-[#365359] text-[#f2d39a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">V9 Properties</h2>
              <p className="text-sm text-[#f2d39a] opacity-80 mb-6">
                We offer a wide range of real estate properties, from luxury villas to smart apartments. Find your dream home with V9 Properties.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#f2d39a] hover:text-blue-500 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#f2d39a] hover:text-blue-400 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#f2d39a] hover:text-blue-700 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#f2d39a] hover:text-pink-500 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" className="hover:underline transition-colors hover:text-white">Home</a></li>
              <li><a href="#projects" className="hover:underline transition-colors hover:text-white">Projects</a></li>
              <li><a href="#overview" className="hover:underline transition-colors hover:text-white">About Us</a></li>
              <li><a href="#contact" className="hover:underline transition-colors hover:text-white">Contact Us</a></li>
              <li><a href="#amenities" className="hover:underline transition-colors hover:text-white">Amenities</a></li>
              <li><a href="#achievements" className="hover:underline transition-colors hover:text-white">Achievements</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
            <p className="text-sm text-[#f2d39a] opacity-80 mb-4">
              Subscribe to our newsletter for the latest updates on new properties, exclusive offers, and real estate insights.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 bg-[#f2d39a] text-[#365359] rounded-md focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="px-3 py-2 bg-[#f2d39a] text-[#365359] rounded-md hover:bg-white transition-colors font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#f2d39a] border-opacity-30 mt-12 pt-8 text-center text-[#f2d39a] text-sm">
          <p>&copy; {new Date().getFullYear()} V9 Properties. All Rights Reserved.</p>
          <p className="mt-2">
            <a href="#privacy" className="hover:underline mr-4">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
          </p>
        </div>
      </div>

      {/* Popup Component */}
      <Popup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message="Thank you for subscribing to our newsletter! You'll now receive the latest updates on new properties, exclusive offers, and real estate insights."
      />
    </footer>
  );
};

export default Footer;
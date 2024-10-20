import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, X } from 'lucide-react';

const Popup = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Subscription Successful</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#2c3e50] text-white px-4 py-2 rounded hover:bg-[#365359] transition-colors"
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
    <footer className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Company Info Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#bf8f36]">V9 Properties</h2>
              <p className="text-sm text-[#365359] mb-6">
                We offer a wide range of real estate properties, from luxury villas to smart apartments. Find your dream home with V9 Properties.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 text-[#bf8f36]">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-2 rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#bf8f36]">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" className="text-[#365359] hover:text-[#2c3e50] transition-colors">Home</a></li>
              <li><a href="#projects" className="text-[#365359] hover:text-[#2c3e50] transition-colors">Projects</a></li>
              <li><a href="#overview" className="text-[#365359] hover:text-[#2c3e50] transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-[#365359] hover:text-[#2c3e50] transition-colors">Contact Us</a></li>
              <li><a href="#amenities" className="text-[#365359] hover:text-[#2c3e50] transition-colors">Amenities</a></li>
              <li><a href="#achievements" className="text-[#365359] hover:text-[#2c3e50] transition-colors">Achievements</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#bf8f36]">Stay Connected</h3>
            <p className="text-sm text-[#365359] mb-4">
              Subscribe to our newsletter for the latest updates on new properties, exclusive offers, and real estate insights.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 bg-white text-[#365359] rounded-md focus:outline-none border border-[#365359]"
                required
              />
              <button 
                type="submit" 
                className="px-3 py-2 bg-[#2c3e50] text-white rounded-md hover:bg-[#365359] transition-colors font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#365359] border-opacity-30 mt-12 pt-8 text-center text-[#365359] text-sm">
          <p>&copy; {new Date().getFullYear()} V9 Properties. All Rights Reserved.</p>
          <p className="mt-2">
            <a href="#privacy" className="hover:text-[#2c3e50] mr-4">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#2c3e50]">Terms of Service</a>
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
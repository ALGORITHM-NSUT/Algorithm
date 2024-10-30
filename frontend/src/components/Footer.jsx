import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail } from "lucide-react";

export default function Footer() {
  
  const [hoveredLink, setHoveredLink] = useState(null);

  // Quick Links and Contact Info Data
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Projects', path: '/projects' }
  ];
  const contactInfo = {
    phone: '9891403568',
    email: 'algorithmNSUT@gmail.com'
  };
  
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start px-5 md:px-[100px]">
        
        {/* Left: Society Name Section */}
        <div 
          className="flex flex-col mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-2">Algorithm Society</h2>
          <p className="text-gray-400 w-full sm:w-72">
            Netaji Subhas University of Technology (East Campus), Tech Chapter
          </p>
        </div>

        {/* Middle: Contact Info Section */}
        <div 
          className="flex flex-col items-start mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-2">Contact Info</h2>
          <motion.div 
            className="flex items-center mb-1 hover:text-blue-400 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Phone className="mr-2" size={18} />
            <p className="text-gray-400">{contactInfo.phone}</p>
          </motion.div>
          <motion.div 
            className="flex items-center mb-4 hover:text-blue-400 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="mr-2" size={18} />
            <p className="text-gray-400">{contactInfo.email}</p>
          </motion.div>
        </div>

        {/* Right: Quick Links Section */}
        <motion.div 
          className="flex flex-col items-start mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-2">Quick Links</h2>
          <div className="grid grid-cols-1 gap-2">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                onHoverStart={() => setHoveredLink(link.name)}
                onHoverEnd={() => setHoveredLink(null)}
                whileHover={{ scale: 1.05 }}
              >
                <a 
                  href={link.path}
                  className={`hover:text-blue-400 transition duration-300 ${
                    hoveredLink === link.name ? 'text-blue-400' : ''
                  }`}
                >
                  {link.name}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-t border-gray-700 my-4" />

      {/* Social Media Icons */}
      <div className="container mx-auto mt-6 flex flex-col sm:flex-row justify-between items-center px-5 md:px-[100px] text-center sm:text-left">
        <h2 
          className="text-lg mb-4 sm:mb-0 cursor-default"
          
        >
          Copyright © 2024 All Rights Reserved by Algorithm Society, NSUT.
        </h2>
        <motion.div 
          className="flex justify-center space-x-4 mt-4 sm:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a 
              key={index} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-400 transition duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <social.icon size={24} /> {/* Fixed icon rendering */}
              <span className="sr-only">{social.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}

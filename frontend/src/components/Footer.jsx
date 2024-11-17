import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Phone, Mail } from "lucide-react";
import { GitHub } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState(null);

  // Data for quick links and contact info
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
    { name: 'Github', icon: GitHub, url: 'https://github.com/ALGORITHM-NSUT' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/company/algorithm-nsut/?viewAsMember=true' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/algorithm_east/profilecard/?igsh=M21ncnQ3NDE2NHNq' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-10 mt-auto">
      <motion.div 
        className="container mx-auto flex flex-col sm:flex-row justify-between px-5 md:px-[100px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left: Society Name Section */}
        <div className="mb-6 sm:mb-0">
          <h2 className="text-3xl font-bold mb-2">Algorithm Society</h2>
          <p className="text-gray-400 max-w-sm">
            Netaji Subhas University of Technology (East Campus), Tech Chapter
          </p>
        </div>

        {/* Middle: Contact Info Section */}
        <div className="flex flex-col mb-6 sm:mb-0">
          <h2 className="text-2xl font-bold mb-2">Contact Info</h2>
          <div className="flex items-center mb-1 text-gray-400 hover:text-blue-400 transition duration-300">
            <Phone className="mr-2" size={18} />
            <p>{contactInfo.phone}</p>
          </div>
          <div className="flex items-center text-gray-400 hover:text-blue-400 transition duration-300">
            <Mail className="mr-2" size={18} />
            <p>{contactInfo.email}</p>
          </div>
        </div>

        {/* Right: Quick Links Section */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-2">Quick Links</h2>
          {quickLinks.map((link, index) => (
           <Link
              key={index}
              to={link.path}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className={`mb-1 transition-transform duration-300 ${
                hoveredLink === link.name ? 'text-blue-400 scale-105' : 'text-gray-400 hover:text-blue-400 hover:scale-105'
              }`}
            >
              {link.name}
            </Link>

          ))}
        </div>
      </motion.div>

      {/* Divider Line */}
      <hr className="border-t border-gray-700 my-6 mx-5 md:mx-[100px]" />

      {/* Social Media Section */}
      <motion.div
        className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-5 md:px-[100px] text-center sm:text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-lg mb-4 sm:mb-0">© 2024 All Rights Reserved by Algorithm Society, NSUT.</p>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="hover:text-blue-400 transition duration-300"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}

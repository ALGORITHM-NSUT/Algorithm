import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  // Quick Links and Contact Info Data
  const quickLinks = ['Home', 'About Us', 'Leaderboard', 'Projects'];
  const contactInfo = {
    phone: '9891403568',
    email: 'sarthak.sharma.ug22@nsut.ac.in'
  };
  
  const socialLinks = [
    { name: 'Facebook', icon: faFacebookF, url: 'https://facebook.com' },
    { name: 'Twitter', icon: faTwitter, url: 'https://twitter.com' },
    { name: 'LinkedIn', icon: faLinkedin, url: 'https://linkedin.com' },
    { name: 'Instagram', icon: faInstagram, url: 'https://instagram.com' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-10"> {/* Increased padding here */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-5 md:px-[100px]">
        
        {/* Left: Society Name Section */}
        <div className="flex flex-col mb-4">
          <h2 className="text-3xl font-bold mb-2">Algorithm Society</h2>
          <p className="text-gray-400 w-72">
            Netaji Subhas University of Technology (East Campus), Tech Chapter
          </p>
        </div>

        {/* Middle: Contact Info Section */}
        <div className="flex flex-col items-start mb-4">
          <h2 className="text-2xl font-bold mb-2">Contact Info</h2>
          <div className="flex items-center mb-1">
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            <p className="text-gray-400">{contactInfo.phone}</p>
          </div>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <p className="text-gray-400">{contactInfo.email}</p>
          </div>
        </div>

        {/* Right: Quick Links Section */}
        <div className="flex flex-col items-start mb-4">
          <h2 className="text-2xl font-bold mb-2">Quick Links</h2>
          <div className="grid grid-cols-1 gap-2">
            {quickLinks.map((link, index) => (
              <a 
                key={index} 
                href={`/${link.replace(/\s+/g, '').toLowerCase()}`} 
                className="hover:text-gray-300 transition duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-t border-gray-700 my-4" />

      {/* Social Media Icons */}
      <div className="container mx-auto mt-10 flex flex-col md:flex-row justify-between items-center px-5 md:px-[100px] text-center md:text-left">
        <h2 className="text-lg mb-4">Copyright © 2024 All Rights Reserved by Algorithm Society, NSUT.</h2>
        <div className="flex justify-center space-x-4">
          {socialLinks.map((social, index) => (
            <a 
              key={index} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gray-300 transition duration-300"
            >
              <FontAwesomeIcon icon={social.icon} size="2x" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

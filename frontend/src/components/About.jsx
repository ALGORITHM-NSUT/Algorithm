import React from 'react';
import Card from './Card'; // Import the Card component

// Define constants for text content
const ABOUT_TEXT = {
  vision: {
    title: 'Our Vision',
    description: 'To create a collaborative environment where tech enthusiasts can explore new concepts, challenge themselves, and make meaningful contributions to the tech community.',
  },
  mission: {
    title: 'Our Mission',
    description: 'To empower individuals with the skills, knowledge, and network they need to excel in the ever-evolving tech world.',
  },
  community: {
    title: 'Our Community',
    description: 'A diverse and vibrant community of developers, designers, engineers, and innovators who believe in learning through collaboration and creating impactful projects.',
  },
};

const About = () => {
  return (
    <div className='text-black'>
      {/* Main Container */}
      <div className='max-w-screen-lg mx-auto py-16 px-4 md:px-10'>
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8">
          About Us
        </h1>

        {/* Subheading */}
        <div className='flex flex-col items-center text-lg md:text-xl text-white mb-4'>
          <p className="text-center max-w-2xl mb-6">
            Welcome to Algorithm, a tech society where innovation meets creativity. Our goal is to foster a community of
            like-minded individuals passionate about technology, coding, and problem-solving. We aim to bridge the gap
            between theory and practical application through collaboration and hands-on projects.
          </p>
        </div>

        {/* Key Points - Cards Section */}
       <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto pb-4 scrollbar-none">
        <div className="flex-shrink-0">
          <Card title={ABOUT_TEXT.vision.title} description={ABOUT_TEXT.vision.description} />
        </div>
        <div className="flex-shrink-0">
          <Card title={ABOUT_TEXT.mission.title} description={ABOUT_TEXT.mission.description} />
        </div>
        <div className="flex-shrink-0">
          <Card title={ABOUT_TEXT.community.title} description={ABOUT_TEXT.community.description} />
        </div>
      </div>

      </div>
    </div>
  );
};

export default About;

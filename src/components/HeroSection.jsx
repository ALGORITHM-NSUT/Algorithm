import React from 'react';

const HeroSection = () => {
  return (
    <div className='relative flex flex-col items-center min-h-screen text-white py-10 w-full bg-[#191e2e] overflow-hidden'>
      <video
        className='absolute top-0 left-0 w-full h-full object-cover' 
        autoPlay 
        loop 
        muted 
      >
        <source src="src/assets/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

     <div className='relative z-10 mt-20 flex flex-col items-center'> 
        <div className='flex items-center justify-start '> 
            <img 
                src="src/assets/algo.png" 
                alt="Logo" 
                className="w-50 h-36 mr-4" 
            />
            <h1 className="text-[250px] text-gray-200 font-bold">Algorithm</h1> 
        </div>
        <div className='flex items-center text-5xl text-gray-300 justify-center font-bold mb-4'>
            <p>Code . Set . Go</p>
        </div>
    <div />



         
        <p className="text-lg max-w-3xl text-gray-400 text-center mb-8 px-4">
           Join us to explore, learn, and innovate together!
        </p>

        <div className='flex space-x-4'>
          <a 
            href="https://forms.gle/tJ4xM1GYgsnUZqTe8" 
            className="bg-[#4c56d7] text-white rounded-full px-6 py-3 hover:shadow-lg transition duration-300"
            target='_blank'
            rel="noopener noreferrer" // Security measure
          >
            Join Us
          </a>
          <a 
            href="#" 
            className="bg-[#4c6467] text-white rounded-full px-6 py-3 hover:shadow-lg transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

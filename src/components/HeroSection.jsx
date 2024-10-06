import React from 'react'

const HeroSection = () => {
  return (
    <div className='flex flex-col items-center bg-[#191e2e] min-h-svh text-white py-10 w-full'>
        <div className='mt-20 flex flex-col items-center'>
            <h1 className="text-[100px] font-bold mb-4">Algorithm Society</h1>
            <p className="text-lg max-w-3xl text-center mb-8">
                We are a community of passionate individuals dedicated to advancing our understanding of algorithms and their applications in solving real-world problems. Join us to explore, learn, and innovate together!
            </p>
        </div>

        <div className=''>
             <div className="flex space-x-4">
          <a 
            href="#" 
            className="bg-[#4c56d7] text-white rounded-full px-6 py-3 hover:shadow-lg transition duration-300"
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
  )
}

export default HeroSection

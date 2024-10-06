import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Core from '../components/Core'

const AboutPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='flex-grow bg-[#191e2e]'>
            <div className="mb-24">
                <Core />
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default AboutPage

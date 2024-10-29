import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Articles from '../components/Newsarticles'
import FloatingBackground from './FloatingBackground';

const Tech_news = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      
      <div className="flex-grow    ">
      <FloatingBackground />
        <Articles />
      </div>
      <Footer />
    </div>
  )
}

export default Tech_news


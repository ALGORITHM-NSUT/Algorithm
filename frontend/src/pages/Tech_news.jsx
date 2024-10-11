import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Articles from '../components/Newsarticles'

const Tech_news = () => {
  return (
    <div className="flex flex-col min-h-screen bg-polygon bg-cover bg-center bg-no-repeat">
      <Navbar />
      <div className="flex-grow">
        <Articles />
      </div>
      <Footer />
    </div>
  )
}

export default Tech_news

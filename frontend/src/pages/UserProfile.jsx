import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Profile from '../components/Profile'

const UserProfile = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-grow bg-polygon bg-cover bg-center  bg-no-repeat">

        <Profile />
      </div>
      <Footer />
    </div>
  )
}

export default UserProfile


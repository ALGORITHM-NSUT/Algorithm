import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Register from '../components/Registercard'

const LoginPage = () => {
  return (

    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <Register />
      <Footer />
    </div>
  )
}

export default LoginPage



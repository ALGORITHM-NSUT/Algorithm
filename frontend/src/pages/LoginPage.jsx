import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Login from '../components/Login'

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-grow bg-polygon bg-cover bg-center  bg-no-repeat">
        <Login />
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage


import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import Login from '../components/Login'

const LoginPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

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


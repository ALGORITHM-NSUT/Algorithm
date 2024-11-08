import React, { useEffect } from 'react'
import Profile from '../components/Profile'

const UserProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 


  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-grow bg-polygon bg-cover bg-center  bg-no-repeat">
        <Profile />
      </div>
    </div>
  )
}

export default UserProfile


import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import OngoingProjects from '../components/OngoingProjects';
import PastProjects from '../components/PastProjects';
import ongoingProjectData from '../constants/ongoingProjectData';
import pastProjectData from '../constants/pastProjectData';
import Footer from '../components/Footer';


const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleJoinRequest = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleSendRequest = (message) => {
    console.log(`Request sent for project ${selectedProject.title} with message: ${message}`);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center bg-polygon bg-cover bg-center bg-no-repeat min-h-screen text-white py-10 w-full">
        <OngoingProjects projects={ongoingProjectData} onJoinRequest={handleJoinRequest} />
        <PastProjects projects={pastProjectData} />
      </div>

      <Footer />


    </div>
  );
};

export default Projects;

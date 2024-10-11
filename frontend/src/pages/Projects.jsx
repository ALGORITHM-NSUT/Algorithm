import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import OngoingProjects from '../components/OngoingProjects';
import PastProjects from '../components/PastProjects';
import Footer from '../components/Footer';






const Projects = () => {
  const [projects, setProjects] = useState({ onGoing: [], completed: [] });
  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then((response) => response.json())
      .then((data) => {
        const onGoing = data.filter(project => project.status);
        const completed = data.filter(project => !project.status);
        console.log(onGoing);
        setProjects({ onGoing, completed });
      })
      .catch((error) => console.error('Error fetching members:', error));
  }, []);



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
        <OngoingProjects projects={projects.onGoing} onJoinRequest={handleJoinRequest} />
        <PastProjects projects={projects.completed} />
      </div>

      <Footer />


    </div>
  );
};

export default Projects;

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';





const Projects = () => {
  const [projects, setProjects] = useState({ onGoing: [], completed: [] });


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/projects');
        const data = await response.json();

        const onGoing = data.filter(project => project.status);
        const completed = data.filter(project => !project.status);
        setProjects({ onGoing, completed });

      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col items-center bg-polygon bg-cover bg-center bg-no-repeat min-h-screen text-white py-10 w-full">
        <div className="w-full mb-24">
          <h2 className="text-5xl md:text-[100px] font-bold text-center mt-10 mb-16">Ongoing Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-4 md:px-10">
            {projects.onGoing.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                isOngoing={true} // Ongoing projects have the join button
              />
            ))}
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-5xl md:text-[100px] font-bold text-center mt-10 mb-14">Past Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-4 md:px-10">
            {projects.completed.map((project, index) => (
              <ProjectCard key={index} project={project} isOngoing={false} />
            ))}
          </div>
        </div>
      </div>

      <Footer />


    </div>
  );
};

export default Projects;

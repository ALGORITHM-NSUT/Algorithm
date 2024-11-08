import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../auth/UserProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import AddProject from '../components/addProject';
import FloatingBackground from './FloatingBackground';
import Loader from '../components/Loader';

const Projects = () => {
  const [projects, setProjects] = useState({ onGoing: [], completed: [] });
  const { user, isLoading: userLoading } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cachedProjects = sessionStorage.getItem('projectsData');
    if (cachedProjects) {
      setProjects(JSON.parse(cachedProjects));
      setIsLoading(false); // Show data instantly if cached
    }

    fetchProjects(); // Fetch latest data in the background
  }, []);




  const fetchProjects = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/projects`, {
        method: "GET",
        credentials: "include"
      });
      const data = await response.json();
      const onGoing = data.filter(project => !project.status);
      const completed = data.filter(project => project.status);

      const newProjects = { onGoing, completed };
      setProjects(newProjects);
      setIsLoading(false);

      // Cache the projects data in sessionStorage
      sessionStorage.setItem('projectsData', JSON.stringify(newProjects));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };


  if (userLoading || isLoading) {
    return <Loader />;



  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <FloatingBackground />
      <div className="flex flex-col items-center flex-grow text-white py-10 w-full relative z-10">
        {projects.onGoing.length > 0 ? (
          <div className="w-full mb-24">
            <h1 className="md:text-[100px] md:leading-[6rem] text-4xl leading-tight font-bold text-center mb-16 font-mono">Current Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-4 md:px-10">
              {projects.onGoing.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  isOngoing={true}
                  refreshProjects={fetchProjects}
                />
              ))}
              {user && user.admin && (
                <div className='relative w-full max-w-[600px] h-full min-h-[640px] max-h-[640px]'>
                  <AddProject refreshProjects={fetchProjects} edit={false} showadd={true} />
                </div>
              )}
            </div>
          </div>
        ) : (
          user && user.admin && (
            <div className='relative w-full max-w-[600px] h-full min-h-[640px] max-h-[640px]'>
              <AddProject refreshProjects={fetchProjects} edit={false} showadd={true} />
            </div>
          )
        )}
        {projects.completed.length > 0 && (
          <div className="w-full">
            <h1 className="md:text-[100px] md:leading-[6rem] text-4xl leading-tight font-bold text-center mb-16 font-mono">Completed Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-4 md:px-10">
              {projects.completed.map((project, index) => (
                <ProjectCard key={index} project={project} isOngoing={false} refreshProjects={fetchProjects} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Projects;

import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../auth/UserProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import AddProject from '../components/addProject';
import FloatingBackground from './FloatingBackground';
import Loader from '../components/Loader';

const Projects = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  
  const [projects, setProjects] = useState({ onGoing: [], completed: [] });
  const { user, isLoading: userLoading } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)
  if (userLoading) {
    return <Loader />
  }
  const fetchProjects = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/projects`, {
        method: "GET",
        credentials: "include"
      });
      const data = await response.json();
      const onGoing = data.filter(project => !project.status);
      const completed = data.filter(project => project.status);
      setProjects({ onGoing, completed });
      setIsLoading(false)

    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col min-h-screen relative">

      <Navbar />
      <FloatingBackground />
      <div className="flex flex-col items-center flex-grow text-white py-10 w-full relative z-10">
        {projects.onGoing.length > 0 ? <div className="w-full mb-24">
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
            {user && user.admin && <div className='relative w-full max-w-[600px] h-full min-h-[640px] max-h-[640px]'>
               <AddProject refreshProjects={fetchProjects} edit={false} showadd={true} />
          </div>}
          </div>
        </div> : <>{user && user.admin && <div className='relative w-full max-w-[600px] h-full min-h-[640px] max-h-[640px]'>
               <AddProject refreshProjects={fetchProjects} edit={false} showadd={true} />
          </div>} </>
        }
        {projects.completed.length > 0 && <div className="w-full">
          <h1 className="md:text-[100px] md:leading-[6rem] text-4xl leading-tight font-bold text-center mb-16 font-mono">Compeleted Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-4 md:px-10">
            {projects.completed.map((project, index) => (
              <ProjectCard key={index} project={project} isOngoing={false} refreshProjects={fetchProjects} />
            ))}
          </div>
        </div>}
      </div>
      <Footer />
    </div>
  );
};

export default Projects;

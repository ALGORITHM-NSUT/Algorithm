import React, { useEffect, useContext, Suspense } from 'react';
import { UserContext, ProjectContext } from '../auth/UserProvider';
import ProjectCard from '../components/ProjectCard';
const AddProject = React.lazy(() => import('../components/addProject.jsx'));
import Loader from '../components/Loader';
import OpacityLoader from '../components/OpacityLoader';

const Projects = () => {
  const { user, userLoading } = useContext(UserContext);
  const { projects, projectLoading, setProjects, setProjectLoading, fetchProjects } = useContext(ProjectContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cachedProjects = sessionStorage.getItem('projectsData');
    if (cachedProjects) {
      setProjects(JSON.parse(cachedProjects));
      setProjectLoading(false); // Show data instantly if cached
    }
    if (!projectLoading) {
      fetchProjects(); // Fetch latest data in the background
    }
  }, []);

  if (userLoading || projectLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <div
        className={`flex flex-col items-center flex-grow text-white py-10 w-full relative z-10  ${userLoading || projectLoading ? 'opacity-0' : 'opacity-100'}`}
      >
        {projects.onGoing.length > 0 ? (
          <div className="w-full mb-24">
            <h1 className="md:text-[100px] md:leading-[6rem] text-4xl leading-tight font-bold text-center mb-16 font-mono">Current Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-4 md:px-10 ">
              {projects.onGoing.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  isOngoing={true}
                  refreshProjects={fetchProjects}
                  user={user}
                  
                />
              ))}
              {user && user.admin && (
                <Suspense fallback={<OpacityLoader />}>
                <div className='relative w-full max-w-[600px] h-[628px] mt-[15px]'>
                  <AddProject refreshProjects={fetchProjects} edit={false} showadd={true} />
                </div>
              </Suspense>
              )}
            </div>
          </div>
        ) : (
          
          user && user.admin && (
            <Suspense fallback={<OpacityLoader />}>
              <div className='relative w-full max-w-[600px] h-[628px] mt-[15px]'>
                <AddProject refreshProjects={fetchProjects} edit={false} showadd={true} />
              </div>
            </Suspense>
          )
          
        )}
        {projects.completed.length > 0 && (
          <div className="w-full">
            <h1 className="md:text-[100px] md:leading-[6rem] text-4xl leading-tight font-bold text-center mb-16 font-mono">Completed Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 px-4 md:px-10">
              {projects.completed.map((project, index) => (
                <ProjectCard key={index} project={project} isOngoing={false} refreshProjects={fetchProjects} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Projects);

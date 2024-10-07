import React from 'react';
import ProjectCard from './ProjectCard';

const PastProjects = ({ projects }) => {
  return (
    <div className="w-full">
      <h2 className="text-[4vw] md:text-[50px] font-bold text-center mt-10 mb-8">Past Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 px-4 md:px-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} isOngoing={false} />
        ))}
      </div>
    </div>
  );
};

export default PastProjects;

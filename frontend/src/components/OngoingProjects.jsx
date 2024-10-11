import React from 'react';
import ProjectCard from './ProjectCard';

const OngoingProjects = ({ projects, onJoinRequest }) => {
  return (
    <div className="w-full mb-24">
      <h2 className="text-5xl md:text-[100px] font-bold text-center mt-10 mb-16">Ongoing Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-4 md:px-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            isOngoing={true} // Ongoing projects have the join button
          />
        ))}
      </div>
    </div>
  );
};

export default OngoingProjects;

import React, { useState } from 'react';
import JoinRequestModal from './JoinRequestModal';

const ProjectCard = ({ project, isOngoing }) => {
  const [showModal, setShowModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the visibility of the card details
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Open modal for join request
  const handleJoinRequest = () => {
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Handle sending the join request
  const handleSendRequest = (message) => {
    console.log(`Request to join ${project.title} with message: ${message}`);
    setShowModal(false); // Close modal after sending the request
  };

  return (
    <div
      className="bg-gray-800 p-4 h-[680px] rounded-lg shadow-lg cursor-pointer transition-all duration-300"
      onClick={toggleExpand} // Clicking anywhere on the card toggles details
    >

        <div className='flex flex-col justify-center items-center mt-14'>
             {!isExpanded && (
                <h3 className="text-5xl font-bold mb-2 md:text-3xl md:text-wrap">{project.title}</h3>
                )}
      
           
            {!isExpanded && (
                <p className="text-gray-300 mt-20 mb-5">{project.description}</p>
            )}
        
        </div>
     

      {/* Card Details: Visibility controlled without changing card height */}
      <div
        className={` mb-11 ${
          isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Project Lead Section */}
        <div className="mb-11">
          <h4 className="font-semibold mb-5">Project Lead:</h4>
          <div className="bg-gray-700 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <p className="font-semibold">{project.lead.name}</p>
            <a
              href={project.lead.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 text-sm hover:text-gray-100 transition-colors duration-200"
            >
              View Profile
            </a>
          </div>
        </div>

        {/* Contributors Section */}
        <p className="mb-5">Contributors:</p>
        <div className="max-h-[180px] overflow-y-auto grid grid-cols-2 gap-2">
          {project.contributors.map((contributor, index) => (
            <div
              key={index}
              className="bg-gray-700 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <p className="font-semibold">{contributor.name}</p>
              <a
                href={contributor.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 text-sm hover:text-gray-100 transition-colors duration-200"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>

        {/* GitHub Link Section */}
        <div className="mt-10">
          <div className="bg-gray-700 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-gray-100 transition-colors duration-200"
            >
              View Project on GitHub
            </a>
          </div>
        </div>

        {/* Join Request Button */}
        {isOngoing && (
          <button
            className="mt-8 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation(); // Prevent button click from toggling card
              handleJoinRequest();
            }}
          >
            Request to Join
          </button>
        )}
      </div>

      {/* Modal for sending join request */}
      {showModal && (
        <JoinRequestModal
          isOpen={showModal}
          project={project}
          onClose={handleCloseModal}
          onSend={handleSendRequest}
        />
      )}
    </div>
  );
};

export default ProjectCard;

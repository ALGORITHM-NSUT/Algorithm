import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const ProjectDetailsModal = ({ isOpen, project, onClose, handleApplication, user, application, handleJoinRequest, handleSendRequest }) => {
  const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '900px', // Max width for larger screens
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyles}>
        <div className="modal-content">
          {/* Title */}
          <h3 className="text-3xl md:text-5xl font-bold mb-4 text-center text-gray-900">{project.title}</h3>
          
          {/* Description */}
          <p className="text-gray-500 mt-4 mb-6 text-base md:text-lg leading-relaxed text-center">
            {project.description}
          </p>

          {/* Project Lead */}
          <h4 className="font-semibold text-lg mb-4 text-gray-800">Project Lead:</h4>
          <div className="bg-gray-100 p-3 rounded-lg shadow-md">
            <p className="font-semibold text-lg text-gray-900">{project.lead.name}</p>
            <a href={project.lead.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-500 text-sm underline">
              View Profile
            </a>
          </div>

          {/* Contributors */}
          <p className="mb-4 text-lg text-gray-800 mt-6">Contributors:</p>
          <div className="max-h-40 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.contributors.map((contributor, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg shadow-md flex flex-col justify-between h-full">
                <p className="font-semibold text-gray-900">{contributor.name}</p>
                <a href={contributor.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-500 text-sm underline">
                  View Profile
                </a>
              </div>
            ))}
          </div>

          {/* Project GitHub Link */}
          <div className="mt-8">
            <div className="bg-gray-100 p-3 rounded-lg shadow-md text-center">
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                View Project on GitHub
              </a>
            </div>
          </div>

          {/* Join Request or Already Applied */}
          {application && project.lead._id !== user._id ? (
            <button
              className="mt-8 w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-lg text-lg"
              onClick={handleJoinRequest}
            >
              Request to Join
            </button>
          ) : (
            <button className="mt-8 w-full py-3 px-6 bg-gray-400 text-white rounded-lg text-lg" disabled>
              Already Applied
            </button>
          )}

          {/* Applicant List */}
          <div className="max-h-32 overflow-y-auto grid grid-cols-1 gap-4 mt-8">
            {project.applicants.map((applicant, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg shadow-md flex justify-between items-center h-full">
                <p className="font-semibold text-gray-900">{applicant.name}</p>
                <div className="flex space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 transition-colors text-white rounded-md py-2 px-4" onClick={() => handleApplication(applicant._id, 1)}>
                    Accept
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 transition-colors text-white rounded-md py-2 px-4" onClick={() => handleApplication(applicant._id, 0)}>
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ProjectDetailsModal;

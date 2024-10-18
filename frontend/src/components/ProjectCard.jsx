import React, { useState, useEffect } from 'react';
import JoinRequestModal from './JoinRequestModal';
import DeleteRequestModal from './deleteProjectModal';
import EditProjectModal from './EditProject'; // Assuming you have or will create this modal
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ProjectCard = function ProjectCard({ project, isOngoing, refreshProjects }) {
  const [showappModal, setShowappModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false); // State for edit modal
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userProfile')));
  const [application, setApplication] = useState(false);
  const navigate = useNavigate();

  const postData = async () => {
    try {
      const response = await fetch('http://localhost:5000/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          title: project.title,
          lead: project.lead._id
        })
      });

      const data = await response.json();
      setApplication(false);
      console.log('Response data:', data);
      return true;
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  useEffect(() => {
    const fetchapplication = async () => {
      try {
        const availability = await fetch('http://localhost:5000/checkapplication', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify({
            title: project.title,
          })
        })

        const data = await availability.json();
        if (data.message === "Application already exists") {
          setApplication(false);
        }
        else {
          setApplication(true);
        }
      }
      catch (error) {
        console.log('error checking open applications', error);
      }
    };

    fetchapplication();
  }, [user, application, project]);

  const handleApplication = async (id, state) => {
    try {
      const applicants = await fetch('http://localhost:5000/applicationstate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          title: project.title,
          applicant: id,
          state: state
        })
      });
      refreshProjects();
      const data = await applicants.json();
      console.log(data);
    }
    catch (error) {
      console.log('error checking open applications', error);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowappModal(false);
    setDeleteModal(false);
    setEditModal(false);
  };

  const handleDeleteRequest = () => {
    setDeleteModal(true);
  };

  const handleDeletesend = async () => {
    try {
      const response = await fetch('http://localhost:5000/deleteProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          title: project.title,
        })
      });
      refreshProjects();
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log('Error deleting project:', error);
    }
  };

  const handleEditRequest = () => {
    setEditModal(true); // Open the edit modal
  };

  const handleEditSubmit = async (editedData) => {
    try {
      const response = await fetch('http://localhost:5000/editProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(editedData) // Send the edited project data
      });
      refreshProjects();
      const data = await response.json();
      console.log(data);
      setEditModal(false); // Close the modal after editing
    } catch (error) {
      console.log('Error editing project:', error);
    }
  };

  const handleJoinRequest = () => {
    setShowappModal(true);
  };

  const handleSendRequest = () => {
    if (postData()) {
      setApplication(false);
    }
    else {
      refreshProjects();
    }
    setShowappModal(false);
  };

  return (
    <div
      className="bg-gray-800/30 p-4 h-[680px] rounded-lg shadow-lg cursor-pointer transition-all duration-300 backdrop-blur-xl"
      onClick={toggleExpand}
    >

      <div className='flex flex-col justify-center items-center mt-1'>
        {!isExpanded && (
          <h3 className="text-5xl font-bold mb-2 md:text-3xl md:text-wrap">{project.title}</h3>
        )}

        {!isExpanded && (
          <p className="text-gray-300 mt-20 mb-5">{project.description}</p>
        )}
      </div>

      <div className={` mb-3 ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {user && project.lead._id === user._id && (
          <div className="flex space-x-2 mb-5">
            <button
              className='bg-red-700 rounded-md w-fit hover:bg-red-800'
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteRequest();
              }}>
              <DeleteIcon fontSize='large' />
            </button>
            <button
              className='bg-yellow-500 rounded-md w-fit hover:bg-yellow-600'
              onClick={(e) => {
                e.stopPropagation();
                handleEditRequest();
              }}>
              <EditIcon fontSize='large' />
            </button>
          </div>
        )}

        <div className="mb-8">
          <h4 className="font-semibold mb-5">Project Lead:</h4>
          <div className="bg-gray-700 p-2 rounded-lg shadow-md">
            <p className="font-semibold">{project.lead.name}</p>
            <a
              href={project.lead.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 text-sm hover:text-gray-100"
            >
              View Profile
            </a>
          </div>
        </div>

        <p className="mb-5">Contributors:</p>
        <div className="max-h-[140px] overflow-y-auto grid grid-cols-2 gap-2">
          {project.contributors.map((contributor, index) => (
            <div
              key={index}
              className="bg-gray-700 p-2 rounded-lg shadow-md"
            >
              <p className="font-semibold">{contributor.name}</p>
              <a
                href={contributor.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 text-sm hover:text-gray-100"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="bg-gray-700 p-2 rounded-lg shadow-md">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-gray-100"
            >
              View Project on GitHub
            </a>
          </div>
        </div>

        {isOngoing && (
          <React.Fragment>
            {user ? (
              application && project.lead._id !== user._id ? (
                <button
                  className="mt-8 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJoinRequest();
                  }}
                >
                  Request to Join
                </button>
              ) : (
                <button
                  className="mt-8 py-2 px-4 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                  disabled
                >
                  Already Applied
                </button>
              )
            ) : (
              <button
                className="mt-8 py-2 px-4 bg-green-700 hover:bg-green-800 text-white rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/login');
                }}
              >
                Login to apply
              </button>
            )}
          </React.Fragment>
        )}

        <div className="max-h-[75px] overflow-y-auto grid grid-cols-1 gap-2 mt-5">
          {project.applicants.map((applicant, index) => (
            <div
              key={index}
              className="bg-gray-700 p-2 mt-1 rounded-lg shadow-md flex justify-between items-center"
            >
              <p className="font-semibold">{applicant.name}</p>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 rounded-md p-2 hover:bg-green-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplication(applicant._id, 1);
                  }}
                >
                  Accept
                </button>
                <button
                  className="bg-red-700 rounded-md p-2 hover:bg-red-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplication(applicant._id, 0);
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {deleteModal && (
        <DeleteRequestModal
          isOpen={deleteModal}
          project={project}
          onClose={handleCloseModal}
          onDelete={handleDeletesend}
        />
      )}

      {/* Modal for sending join request */}
      {showappModal && (
        <JoinRequestModal
          isOpen={showappModal}
          project={project}
          onClose={handleCloseModal}
          onSend={handleSendRequest}
        />
      )}
    </div >
  );
};

export default ProjectCard;

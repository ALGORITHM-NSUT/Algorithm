import React, { useState, useEffect } from 'react';
import JoinRequestModal from './JoinRequestModal';
import DeleteRequestModal from './deleteProjectModal';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectCard = function ProjectCard({ project, isOngoing, refreshProjects }) {
  const [showappModal, setShowappModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('userProfile')));
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
      console.log('Response data:', data);  // Handle the response
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
        if (data.message == "Application already exists") {
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
  }, [user, application]);


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
      })
      refreshProjects();
      const data = await applicants.json();
      console.log(data);
    }
    catch (error) {
      console.log('error checking open applications', error);
    }
  };



  // useEffect(() => {
  //   console.log(project);
  // }, [project]);

  // Toggle the visibility of the card details
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowappModal(false);
    setDeleteModal(false);
  };

  const handleDeleteRequest = () => {
    setDeleteModal(true);
  }

  const handleDeletesend = async () => {
    try {
      const applicants = await fetch('http://localhost:5000/deleteProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({
          title: project.title
        })
      })
      refreshProjects();
      const data = await applicants.json();
      console.log(data);
    }
    catch (error) {
      console.log('error checking open applications', error);
    }
  }
  // Open modal for join request
  const handleJoinRequest = () => {
    setShowappModal(true);
  };

  // Close modal

  // Handle sending the join request
  const handleSendRequest = () => {
    if (postData()) {
      setApplication(false);
    };
    setShowappModal(false); // Close modal after sending the request
  };
  return (
    <div
      className="bg-gray-800/30 p-4 h-[680px] rounded-lg shadow-lg cursor-pointer transition-all duration-300 backdrop-blur-xl"
      onClick={toggleExpand} // Clicking anywhere on the card toggles details
    >
      {project.lead._id == user._id && (<button
        className='block bg-red-700 rounded-md top-0 left-0 w-fit'
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteRequest();
        }}>
        <DeleteIcon fontSize='large' />
      </button>)}
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
        className={` mb-3 ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        {/* Project Lead Section */}

        <div className="mb-8">

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
        <div className="max-h-[140px] overflow-y-auto grid grid-cols-2 gap-2">
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
          <React.Fragment>
            {user ? (
              application && project.lead._id != user._id ? (
                <button
                  className="mt-8 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent button click from toggling card
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
                  e.stopPropagation(); // Prevent button click from toggling card
                  navigate('/login')
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
              className="bg-gray-700 p-2 mt-1 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex justify-between items-center"
            >
              <p className="font-semibold">{applicant.name}</p>
              <div className="flex space-x-2">
                <button
                  className="bg-green-500 rounded-md p-2 hover:bg-green-600 transition duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplication(applicant._id, 1)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 15.172L16.95 8.222a1 1 0 011.414 1.414l-8.485 8.485a1 1 0 01-1.414 0l-4.242-4.242a1 1 0 011.414-1.414L10 15.172z" />
                    <path d="M10 15.172L5.636 10.808a1 1 0 00-1.415 1.414l5.656 5.656a1 1 0 001.415 0l10-10a1 1 0 00-1.415-1.415l-9.293 9.293z" />
                  </svg>
                </button>
                <button
                  className="bg-red-500 rounded-md p-2 hover:bg-red-600 transition duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplication(applicant._id, 0)
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 11.293l-4.293-4.293-1.414 1.414L10.586 12l-4.293 4.293 1.414 1.414L12 12.414l4.293 4.293 1.414-1.414L13.414 12l4.293-4.293-1.414-1.414L12 11.293z" clipRule="evenodd" />
                  </svg>
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
    </div>
  );
}

export default ProjectCard;

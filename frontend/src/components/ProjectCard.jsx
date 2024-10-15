import React, { useState, useEffect } from 'react';
import JoinRequestModal from './JoinRequestModal';
import { useNavigate } from 'react-router-dom';

const ProjectCard = React.memo(function ProjectCard({ project, isOngoing }) {
  const [showModal, setShowModal] = useState(false);
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
          lead: project.lead.name
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

  // useEffect(() => {
  //   const fetchapplication = async () => {
  //     try {
  //       const applicants = await fetch('http://localhost:5000/applicationapproval', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         credentials: "include",
  //         body: JSON.stringify({
  //           title: project.title,
  //         })
  //       })

  //       const applicant = await applicants.json();

  //     }
  //     catch (error) {
  //       console.log('error checking open applications', error);
  //     }
  //   };

  //   fetchapplication();
  // }, [user, application]);
  // useEffect(() => {
  //   console.log(project);
  // }, [project]);

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
  const handleSendRequest = () => {
    if (postData()) {
      setApplication(false);
    };
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
        className={` mb-11 ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'
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
          <React.Fragment>
            {user ? (
              application ? (
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
});

export default ProjectCard;

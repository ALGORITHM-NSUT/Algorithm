import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../auth/UserProvider';
import JoinRequestModal from './JoinRequestModal';
import DeleteRequestModal from './deleteProjectModal';
import AddProject from './addProject';
import { motion, AnimatePresence } from 'framer-motion';
import "slick-carousel/slick/slick.css"; // Import slick carousel CSS
import "slick-carousel/slick/slick-theme.css";

import OpacityLoader from './OpacityLoader';
import ProjectImageCarousel from './ProjectImageCarousel';
import ProjectDetails from './ProjectDetails';

const ProjectCard = ({ project, isOngoing, refreshProjects }) => {
  const [showappModal, setShowappModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useContext(UserContext);
  const [editProject, setEditProject] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editProject) {
      setEditProject(false);
    }
  }, [isExpanded]);

  const showLoader = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowappModal(false);
    setDeleteModal(false);
    setEditModal(false);
    setShowUserProfileModal(false);
  };

  const handleDeleteRequest = () => {
    setDeleteModal(true);
  };

  const handleJoinRequest = () => {
    showLoader();
    setShowappModal(true);
  };

  const handleSendRequest = () => {
    showLoader();
    if (postData()) {
      refreshProjects();
    }
    setShowappModal(false);
  };

  const handleViewProfile = (userDetails) => {
    setSelectedUser(userDetails);
    setShowUserProfileModal(true);
  };

  const postData = async () => {
    showLoader();
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/application`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: project.title, lead: project.lead._id })
      });
      const data = await response.json();
      if (response.status !== 201) {
        alert(data.message);
      } else {
        refreshProjects();
      }
      return true;
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleApplication = async (id, state) => {
    showLoader();
    try {
      const applicants = await fetch(import.meta.env.VITE_BACKEND_URL + `/handleApplication`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: project.title, applicant: id, state: state })
      });
      const data = await applicants.json();
      if (applicants.status !== 200) {
        alert(data.message);
      } else {
        refreshProjects();
      }
    } catch (error) {
      console.error('Error updating application state:', error);
    }
  };

  const handleDeletesend = async () => {
    showLoader();
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/deleteProject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: project.title })
      });
      const data = await response.json();
      if (response.status !== 200) {
        alert(data.message);
      } else {
        refreshProjects();
        toggleExpand();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="transform transition-transform duration-300 ease-in-out">
      {loading && <OpacityLoader />}
      <motion.div
        onClick={toggleExpand}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative p-6 w-full cursor-pointer rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
          isExpanded ? "scale-100" : "scale-95"
        }`}
      >
        <div className="relative rounded-lg overflow-hidden">
          <AddProject
            refreshProjects={refreshProjects}
            showadd={false}
            edit={editProject}
            setEditState={setEditProject}
            project={project}
          />

          <div className="bg-[#330080] h-[120px] flex items-center relative rounded-t-lg">
            <div className="w-full ml-4">
              <span className="text-4xl truncate max-w-[75%] font-bold text-white block">
                {project.title}
              </span>
            </div>

            {project.liveLink && (
              <a
                href={project.liveLink}
                rel="noreferrer"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 right-2 px-3 py-1 text-lg text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-lg transition duration-200 ease-in-out"
              >
                Live<sup className="animate-pulse ml-1">•</sup>
              </a>
            )}
          </div>

          <ProjectImageCarousel project={project} />

          <div className="bg-[#18142F] p-4 rounded-b-lg">
            <div className="text-white text-lg mb-2 min-h-[76px]">
              {!isExpanded && project.description.length > 150
                ? `${project.description.slice(0, 150)}...`
                : project.description}
            </div>

            {isExpanded && (
              <ProjectDetails
                project={project}
                user={user}
                handleViewProfile={() => {}}
                handleApplication={handleApplication}
                handleDeleteRequest={handleDeleteRequest}
                editProject={editProject}
                setEditProject={setEditProject}
                setIsExpanded={setIsExpanded}
              />
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showappModal && (
          <JoinRequestModal
            project={project}
            handleSendRequest={handleSendRequest}
            handleCloseModal={handleCloseModal}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteModal && (
          <DeleteRequestModal
            handleDeletesend={handleDeletesend}
            handleCloseModal={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectCard;

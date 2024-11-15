import React, { useState, useEffect, useContext, Suspense } from 'react';
import { UserContext } from '../auth/UserProvider';
const JoinRequestModal = React.lazy(() => import('./JoinRequestModal'));
const DeleteRequestModal = React.lazy(() => import('./deleteProjectModal'));
import ProjectImageCarousel from './ProjectImageCarousel';
const ProjectDetails = React.lazy(() => import('./ProjectDetails'));
const AddProject = React.lazy(() => import('./addProject'));
import { AnimatePresence } from 'framer-motion';
import "slick-carousel/slick/slick.css"; // Import slick carousel CSS
import "slick-carousel/slick/slick-theme.css";
import { Typography, Paper, Box, Grid } from '@mui/material';
import OpacityLoader from './OpacityLoader';
import { useNavigate } from "react-router-dom";
import Skeleton_loader from "./Skeleton_loader";



const ProjectCard = ({ project, isOngoing, refreshProjects }) => {
  const [showappModal, setShowappModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useContext(UserContext);
  const [editProject, setEditProject] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (editProject) {
      setEditProject(false);
    }
  }, [isExpanded]);

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
      setShowappModal(true);
  };

  const handleSendRequest = () => {
      if (postData()) {
        refreshProjects();
      }
      setShowappModal(false);
  };

  const postData = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleApplication = async (id, state) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDeletesend = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      
  {loading && <OpacityLoader />}
  
  <div
    onClick={toggleExpand}
    className={`relative p-1 w-full rounded-lg transition-all duration-300 ease-in-out cursor-pointer ${
      isExpanded ? ' md:scale-110  z-30' : 'z-10'
    }`}
  >

      <Paper
        sx={{
          background: 'linear-gradient(to right, #ffffff)',
          backgroundColor: '#15142F',
          borderRadius: 3,
          boxShadow: 6,
          transition: 'all 0.3s ease-in-out',
          overflow: 'hidden',
          cursor: 'pointer',
          zIndex: -2,
          color: 'black',
          '&:hover': { boxShadow: 12 },
          width: '100%',
          maxWidth: '600px',
          mx: 'auto',
        }}
        onClick={toggleExpand}
      >
        <div>
          <Suspense fallback={<OpacityLoader />}>
            {editProject && <AddProject
              refreshProjects={refreshProjects}
              showadd={false}
              edit={editProject}
              setEditState={setEditProject}
              project={project}
            />}
          </Suspense>
        </div>
        <div
          style={{
            background: 'white', // Changed from 'white' to '#330080'
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            clipPath: 'path("M0,90 C200,150 400,0 600,90 L600,0 L0,0 Z")',
            marginBottom: '0px',
          }}
        >
          <Typography
            variant={isExpanded ? 'h5' : 'h4'}
            component="h3"
            sx={{
              background: '#18142F', // Changed from 'white' to '#330080'
              WebkitBackgroundClip: 'text',
              color: 'white',
              transition: 'all 0.3s',
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '1.8rem', sm: '2rem', md: '2.3rem' },
              position: 'relative',
              zIndex: 1,
              textAlign: 'center',
              fontFamily: 'sans-serif',
            }}
          >
            <span
              style={{
                position: 'relative',
                zIndex: 2,
                color: '#330080',
                padding: '60px 10px 30px',
              }}
            >
              {project.title}
            </span>
          </Typography>
          {project.liveLink != '' && <a href={project.liveLink} rel="noreferrer" target="_blank" onClick={(e) => {
              e.stopPropagation();
            }}>
              <span className={"absolute top-0 right-0 mr-[5px] mt-[5px] pr-[5px] pl-[7px] text-[20px] text-white bg-[#b91c1c] hover:bg-[#991b1b] rounded-lg"}>Live<sup className='animate-pulse ml-[1px]'>•</sup></span>
            </a>}
        </div>
        <ProjectImageCarousel project={project} />
        
        

        <Box sx={{ backgroundColor: '#18142F', p: 2 }}>
          <Typography
            variant="body1"
            sx={{
              position: 'relative',
              display: 'flex',
              color: 'white',
              animation: 'fadeIn 0.5s ease-in-out',
              fontSize: '17px',
              mb: 2,
              minHeight: '76px',
            }}
          >
            <div
              className={`relative overflow-hidden transition-all duration-500 ${
                isExpanded ? "max-h-screen opacity-100" : "max-h-[100px] opacity-90"
              }`}
            >

              <div className='flex '>
                <span>{project.description}</span>

                {!isExpanded && (
                  <span className='absolute bottom-0 right-0'>
                    ...
                  </span>
                )}
                
              </div>
              
            </div>
              
          </Typography>
          

          {/* opening animation */}
          
        <div
           className={`overflow-hidden transition-[max-height,opacity] duration-1000 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >  <Suspense fallback={<Skeleton_loader />}>
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
            </Suspense>
        </div>
        


          
          {isOngoing ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  {user ? (
                    project.applicable && project.lead._id !== user._id ? (
                      user.githubProfile ? (<button
                        className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJoinRequest();
                        }}
                      >Request to Join </button>) :
                        (<button
                          className="mt-2 py-2 px-4 bg-[#330080] text-white rounded-lg cursor-not-allowed w-full"
                          disabled
                        >
                          Add Github to apply
                        </button>)

                    ) : (
                      <button
                        className="mt-2 py-2 px-4 bg-[#330080] text-white rounded-lg cursor-not-allowed w-full"
                        disabled
                      >
                        Already Applied
                      </button>
                    )
                  ) : (
                    <button
                      className="mt-2 py-2 px-4 bg-[#40199a] hover:bg-green-800 text-white rounded-lg w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/login');
                      }}
                    >
                      Login to apply
                    </button>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <a href={project.githubUrl} rel="noreferrer" target="_blank">
                    <button
                      className="mt-2 py-2 px-4 bg-[#40199a] hover:bg-[#330080] text-white rounded-lg w-full"

                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      View on GitHub
                    </button>
                  </a>
                </Grid>
              </Grid>
            </>
            ) :
            <a href={project.githubUrl} rel="noreferrer" target="_blank">
              <button
                className="mt-2 py-2 px-4 bg-[#40199a] hover:bg-[#330080] text-white rounded-lg w-full"

                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                View on GitHub
              </button>
            </a>
        }
        
        <Suspense fallback={<OpacityLoader />}>
          <AnimatePresence>
            {showappModal && (
              <JoinRequestModal
                isOpen={showappModal}
                project={project}
                onClose={handleCloseModal}
                onSend={handleSendRequest}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
      
        {deleteModal && (
          <DeleteRequestModal
            isOpen={deleteModal}
            project={project}
            onClose={handleCloseModal}
            onDelete={handleDeletesend}
          />
        )}
      </AnimatePresence>
    </Suspense>
  </Box>
  </Paper>
  </div>
</div>

  );
};

export default React.memo(ProjectCard);

import React, { useState, useEffect } from 'react';
import JoinRequestModal from './JoinRequestModal';
import DeleteRequestModal from './deleteProjectModal';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Button, Box, Link, useMediaQuery, useTheme, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddProject from './addProject';
import { motion } from 'framer-motion';
import { Fullscreen } from 'lucide-react';
import { FaBlackTie } from 'react-icons/fa';
import "slick-carousel/slick/slick.css"; // Import slick carousel CSS
import "slick-carousel/slick/slick-theme.css";
import UserProfileModal from './UserProfileModal';
import { IconButton, Tooltip } from '@mui/material';

const ProjectCard = ({ project, isOngoing, refreshProjects }) => {
  const [showappModal, setShowappModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userProfile')));
  const [application, setApplication] = useState(false);
  const navigate = useNavigate();
  const [editProject, setEditProject] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [showUserProfileModal, setShowUserProfileModal] = useState(false); // State for user profile modal
  const [selectedUser, setSelectedUser] = useState(null); // State for the selected user

  const postData = async () => {
    try {
      const response = await fetch('http://localhost:5000/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: project.title, lead: project.lead._id })
      });
      const data = await response.json();
      setApplication(false);
      return true;
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const availability = await fetch('http://localhost:5000/checkapplication', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ title: project.title })
        });

        const data = await availability.json();
        setApplication(data.message !== 'Application already exists');
      } catch (error) {
        console.error('Error checking open applications:', error);
      }
    };

    fetchApplication();
  }, [user, application, project]);

  const handleApplication = async (id, state) => {
    try {
      const applicants = await fetch('http://localhost:5000/handleApplication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: project.title, applicant: id, state: state })
      });
      const data = await applicants.json();
      console.log(data.message);
      refreshProjects();
    } catch (error) {
      console.error('Error updating application state:', error);
    }
  };

  useEffect(() => {
    if (editProject) {
      setEditProject(false);
    }
  }, [isExpanded])

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

  const handleDeletesend = async () => {
    try {
      await fetch('http://localhost:5000/deleteProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: project.title })
      });
      refreshProjects();
      toggleExpand();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleJoinRequest = () => {
    setShowappModal(true);
  };

  const handleSendRequest = async () => {
    const success = await postData();
    if (success) {
      setApplication(false);
      setShowappModal(false);
    } else {
      refreshProjects();
    }
  };

  const handleViewProfile = (userDetails) => {
    setSelectedUser(userDetails); // Set the selected user details
    setShowUserProfileModal(true); // Open the user profile modal
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,           // Enables autoplay
    autoplaySpeed: 3000,      // Speed in milliseconds (3 seconds per slide)
  };

  return (
    <React.Fragment>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleExpand}
        ></div>
      )}
      <div
        onClick={toggleExpand}
        className={`relative p-4 w-full rounded-lg transition-all duration-300 ease-in-out cursor-pointer 
        ${isExpanded ? 'scale-110 z-30' : 'z-10'}`}
      >
        <Paper
          sx={{
            background: 'linear-gradient(to right, #ffffff)',
            borderRadius: 3,
            boxShadow: 6,
            transition: 'all 0.3s ease-in-out',
            overflow: 'hidden',
            cursor: 'pointer',
            color: 'black', // Corrected this line
            '&:hover': { boxShadow: 12 },
            width: '100%', // Ensure the paper takes full width
            maxWidth: '600px', // Max width to prevent stretching on large screens
            mx: 'auto', // Center the paper on larger screens
          }}
        >
          <div>
            <AddProject
              refreshProjects={refreshProjects}
              showadd={false}
              edit={editProject}
              setEditState={setEditProject}
              project={project}
            />
          </div>
          <div style={{
            background: '#330080', // Changed from 'white' to '#330080'
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            zIndex: 0,
            clipPath: 'path("M0,100 C200,200 400,0 600,100 L600,0 L0,0 Z")',
          }}>
            <Typography
              variant={isExpanded ? 'h5' : 'h4'}
              component="h3"
              sx={{
                background: '#330080',
                WebkitBackgroundClip: 'text',
                color: 'white',
                transition: 'all 0.3s',
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                fontFamily: "'Cursive', sans-serif", // Fancy font
              }}
            >
              <span style={{
                position: 'relative',
                zIndex: 2,
                color: 'white',
                padding: '60px 10px 30px',
              }}>
                {project.title}
              </span>
            </Typography>
          </div>
          {/* Carousel for Project Images */}
          {project.images && project.images.length > 0 && (
            project.images.length === 1 ? (
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '75%',  // 3:4 aspect ratio
                  borderRadius: '10px',
                  overflow: 'hidden',
                  maxWidth: '100%'
                }}
              >
                <Box
                  component="img"
                  src={project.images[0]}
                  loading="lazy"
                  alt="Project image"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    p: 2,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            ) : (
              <Slider {...carouselSettings} style={{ margin: '20px auto', maxWidth: '100%', overflow: 'hidden' }}>
                {project.images.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: 'relative',
                      width: '100%',
                      paddingTop: '75%',  // 3:4 aspect ratio
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={image}
                      loading="lazy"
                      alt="Project image"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        p: 2,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                ))}
              </Slider>
            )
          )}

          <Typography variant="h6" sx={{ color: '#330080', fontWeight: 'bold', mt: 3 }}>
            Project Description:
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {project.description}
          </Typography>

          {/* Project Lead Section */}
          <Typography variant="h6" sx={{ color: '#330080', fontWeight: 'bold', mt: 3 }}>
            Project Lead:
          </Typography>
          <Box sx={{ backgroundColor: '#330075', p: 2, borderRadius: 2, mt: 2 }}>
            <Typography variant="body1" color="white">{project.lead.name}</Typography>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleViewProfile(project.lead); // Pass the lead directly
              }}
              sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: 'red' } }}
            >
              View Profile
            </Link>
          </Box>

          {/* Contributors Section */}
          {project.contributors.length !== 0 && (
            <Typography variant="h6" sx={{ mt: 3, mb: 3, fontWeight: 'bold', color: '#330080' }}>
              Contributors:
            </Typography>
          )}
          <Grid container spacing={2}>
            {project.contributors.map((contributor, index) => (
              <Grid item xs={6} key={index}>
                <Box
                  sx={{
                    backgroundColor: '#330075',
                    p: 2,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}
                >
                  <Typography variant="body1" color="white">{contributor.name}</Typography>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleViewProfile(contributor); // Pass contributor details
                    }}
                    sx={{ color: 'white', textDecoration: 'none', '&:hover': { color: 'red' } }}
                  >
                    View Profile
                  </Link>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* User Profile Modal */}
          <UserProfileModal
            isOpen={showUserProfileModal}
            onClose={() => setShowUserProfileModal(false)}
            userDetails={selectedUser} // Pass the selected user details to the modal
          />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            {isOngoing ? (
              <>
                <Button
                  variant="contained"
                  onClick={handleJoinRequest}
                  sx={{ backgroundColor: '#330075', '&:hover': { backgroundColor: '#330080' } }}
                >
                  Join Project
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteRequest}
                  startIcon={<DeleteIcon />}
                >
                  Delete Project
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditModal(true);
                    setEditProject(project); // Pass project details for editing
                  }}
                  startIcon={<EditIcon />}
                >
                  Edit Project
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeleteRequest}
                  startIcon={<DeleteIcon />}
                >
                  Delete Project
                </Button>
              </>
            )}
          </Box>

        </Paper>
      </div>

      {/* Join Request Modal */}
      <JoinRequestModal
        open={showappModal}
        handleClose={handleCloseModal}
        handleSendRequest={handleSendRequest}
        projectTitle={project.title}
      />

      {/* Delete Project Modal */}
      <DeleteRequestModal
        open={deleteModal}
        handleClose={handleCloseModal}
        handleDelete={handleDeletesend}
        projectTitle={project.title}
      />

      {/* Edit Project Modal */}
      {editModal && (
        <AddProject
          showadd={editModal}
          edit={true}
          project={editProject}
          setEditState={setEditModal}
          refreshProjects={refreshProjects}
        />
      )}
    </React.Fragment>
  );
};

export default ProjectCard;

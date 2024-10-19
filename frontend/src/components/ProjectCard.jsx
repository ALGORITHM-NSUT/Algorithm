import React, { useState, useEffect } from 'react';
import JoinRequestModal from './JoinRequestModal';
import DeleteRequestModal from './deleteProjectModal';
import EditProjectModal from './EditProject';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Button, Box, IconButton, Link, useMediaQuery, useTheme, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddProject from './addProject';
import { motion } from 'framer-motion';

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
      const applicants = await fetch('http://localhost:5000/applicationstate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: project.title, applicant: id, state: state })
      });
      refreshProjects();
    } catch (error) {
      console.error('Error updating application state:', error);
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
      await fetch('http://localhost:5000/deleteProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title: project.title })
      });
      refreshProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleEditRequest = () => {
    setEditModal(true);
  };

  const handleEditSubmit = async (editedData) => {
    try {
      await fetch('http://localhost:5000/editProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(editedData)
      });
      refreshProjects();
      setEditModal(false);
    } catch (error) {
      console.error('Error editing project:', error);
    }
  };

  const handleJoinRequest = () => {
    setShowappModal(true);
  };

  const handleSendRequest = () => {
    if (postData()) {
      setApplication(false);
    } else {
      refreshProjects();
    }
    setShowappModal(false);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        sx={{
          background: 'linear-gradient(to right, #1f2937, #111827)',
          borderRadius: 3,
          boxShadow: 6,
          transition: 'all 0.3s ease-in-out',
          overflow: 'hidden',
          cursor: 'pointer',
          '&:hover': { boxShadow: 12 },
          width: '100%', // Ensure the paper takes full width
          maxWidth: '600px', // Max width to prevent stretching on large screens
          mx: 'auto', // Center the paper on larger screens
        }}
        onClick={toggleExpand}
      >
        <AddProject
          refreshProjects={refreshProjects}
          showadd={false}
          edit={editProject}
          setEditState={setEditProject}
          project={project}
        />

        <Box sx={{ p: 3 }}>
          <Typography
            variant={isExpanded ? 'h5' : 'h4'}
            component="h3"
            sx={{
              background: 'linear-gradient(to right, #3b82f6, #10b981)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              transition: 'all 0.3s',
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }, // Responsive font size
            }}
          >
            {project.title}
          </Typography>

          {!isExpanded && (
            <Typography
              variant="body1"
              sx={{ color: '#d1d5db', animation: 'fadeIn 0.5s ease-in-out', mb: 3 }}
            >
              {project.description}
            </Typography>
          )}

          {/* Action Buttons for Project Lead */}
          {user && project.lead._id === user._id && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <IconButton
                sx={{
                  backgroundColor: '#b91c1c',
                  '&:hover': { backgroundColor: '#991b1b' },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRequest();
                }}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>

              <IconButton
                sx={{
                  backgroundColor: '#f59e0b',
                  '&:hover': { backgroundColor: '#d97706' },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditProject(!editProject);
                }}
              >
                <EditIcon fontSize="large" />
              </IconButton>
            </Box>
          )}

          {/* Expanded View */}
          {isExpanded && (
            <Box sx={{ mt: 4 }}>
              {/* Project Lead Section */}
              <Typography variant="h6" sx={{ color: '#d1d5db', fontWeight: 'bold' }}>
                Project Lead:
              </Typography>
              <Box sx={{ backgroundColor: '#374151', p: 2, borderRadius: 2, mt: 2 }}>
                <Typography variant="body1" color="white">{project.lead.name}</Typography>
                <Link
                  href={project.lead.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ color: '#d1d5db', textDecoration: 'none', '&:hover': { color: '#ffffff' } }}
                >
                  View Profile
                </Link>
              </Box>

              {/* Contributors Section */}
              <Typography variant="h6" sx={{ mt: 3, mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
                Contributors:
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{
                  maxHeight: '180px',
                  overflowY: 'auto',
                  pr: 1,
                  scrollBehavior: 'smooth',
                  '&::-webkit-scrollbar': {
                    width: '8px', // Custom scrollbar width
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#aaa', // Scrollbar color
                    borderRadius: '10px', // Rounded scrollbar
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#888', // Darker on hover
                  },
                }}
              >
                {project.contributors.map((contributor, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#1f2937', // Darker background for modern look
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                        transition: 'transform 0.3s, background-color 0.3s',
                        '&:hover': {
                          backgroundColor: '#374151', // Slightly lighter on hover
                          transform: 'scale(1.05)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Add depth on hover
                        },
                      }}
                    >
                      <Avatar
                        src={contributor.avatarUrl}
                        alt={contributor.name}
                        sx={{ width: 48, height: 48, mr: 2, border: '2px solid white', boxShadow: 2 }} // Larger avatar with border
                      />
                      <Box>
                        <Typography variant="body1" color="white" sx={{ fontWeight: 'bold' }}>
                          {contributor.name}
                        </Typography>
                        <Link
                          href={contributor.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          sx={{
                            color: '#d1d5db',
                            textDecoration: 'underline', // Underline for modern feel
                            '&:hover': {
                              color: '#ffffff',
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          View Profile
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {/* Applicants Section */}
              <Box sx={{ mt: 5, maxHeight: '75px', overflowY: 'auto' }}>
                {project.applicants.map((applicant, index) => (
                  <Box
                    key={index}
                    sx={{
                      backgroundColor: '#374151',
                      p: 2,
                      mt: 1,
                      borderRadius: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" color="white">{applicant.name}</Typography>
                    <Box>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mr: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplication(applicant._id, 1);
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplication(applicant._id, 0);
                        }}
                      >
                        Decline
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

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

          <div className="max-h-[140px] overflow-y-auto grid grid-cols-1 gap-2 mt-5">
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

          {/* GitHub Link */}
          <Box sx={{ mt: 4 }}>
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              sx={{ color: '#d1d5db', textDecoration: 'none', '&:hover': { color: '#ffffff' } }}
            >
              View Project on GitHub
            </Link>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default ProjectCard;

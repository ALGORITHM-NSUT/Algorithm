import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Button, Link, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserProfileModal from './UserProfileModal'; // Ensure this component is correctly imported
import ContributorsList from './ContributorsList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProjectDetails = ({ project, user, handleViewProfile, handleApplication, handleDeleteRequest, editProject, setEditProject }) => {
  const [showUserProfileModal, setShowUserProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenUserProfile = (userDetails) => {
    setSelectedUser(userDetails);
    setShowUserProfileModal(true);
  };

  const handleCloseUserProfile = () => {
    setShowUserProfileModal(false);
    setSelectedUser(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <Box>
          {/* Project Lead Section */}
          <Typography variant="h6" className="text-white font-bold mb-1">
            Project Lead:
          </Typography>

         <div className="bg-white p-4 rounded-lg shadow-sm w-full h-[80px] mb-6">          
          
          <Typography variant="body1" className="font-semibold text-[#330080] mb-2">
            {project.lead.name}
          </Typography>
          
          {/* View Profile Button */}
          <Tooltip title="View Profile" arrow>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOpenUserProfile(project.lead);
              }}
              sx={{
                textTransform: 'none',
                fontSize: '0.875rem',
                color: '#330080',
                fontWeight: 500,
                '&:hover': {
                  color: '#d97706', // Change color on hover
                },
                display: 'flex',
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 16, mr: 1 }} />
              View Profile
            </Button>
          </Tooltip>
        </div>


          {/* Contributors List */}
          <ContributorsList project={project} handleViewProfile={handleOpenUserProfile} />

          {/* User Profile Modal */}
          <UserProfileModal
            isOpen={showUserProfileModal}
            onClose={handleCloseUserProfile}
            userDetails={selectedUser}
          />

          {/* Applicants Section */}
          {project.applicants.length > 0 && (
            <>
              <Typography variant="h6" className="text-white font-bold mb-2">
                Applications:
              </Typography>
              <Box
                className="max-h-[100px] overflow-y-auto pr-1 scroll-smooth scrollbar-thin scrollbar-thumb-[#aaa] scrollbar-thumb-rounded-lg hover:scrollbar-thumb-[#888]"
              >
                {project.applicants.map((applicant, index) => (
                  <Box key={index} className="bg-white p-1 mb-1 rounded-lg flex justify-between items-center">
                    <Box className="flex flex-col items-start">
                      <Typography className="text-[#330080]">{applicant.name}</Typography>
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenUserProfile(applicant); // Open user profile modal
                        }}
                        className="text-[#330080] text-sm font-normal hover:text-red-500"
                      >
                        View Profile
                      </Link>
                    </Box>

                    <Box className="flex">
                      <Button
                        variant="contained"
                        color="success"
                        className="mr-1 text-xs py-1 px-2 min-w-auto"
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
                        className="text-xs py-1 px-2 min-w-auto"
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
            </>
          )}

          {/* Edit and Delete Section */}
          {user && project.lead._id === user._id && (
            <Box className="relative flex gap-2 mt-2 justify-end">
              <Tooltip title="Delete" arrow>
                <IconButton
                  className="bg-[#b91c1c] hover:bg-[#991b1b] transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRequest();
                  }}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </Tooltip>

              <Tooltip title={editProject ? 'Cancel Edit' : 'Edit'} arrow>
                <IconButton
                  className="bg-[#f59e0b] hover:bg-[#d97706] transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditProject((prev) => !prev);
                  }}
                >
                  <EditIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetails;

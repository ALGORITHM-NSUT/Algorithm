import React, { useState } from 'react';
import { Box, Typography, Button, Link, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserProfileModal from '../UserProfileModal'; // Ensure this component is correctly imported
import ContributorsList from './ContributorsList';

const ProjectDetails = ({ project, user, handleApplication, handleDeleteRequest, editProject, setEditProject }) => {
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
    <Box>
      {/* Project Lead Section */}
      
      {user && project.lead._id === user._id && (
        <Box className="w-fit relative right-0 flex gap-2 bg-white shadow-lg rounded-lg mb-2">
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
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
        Project Lead:
      </Typography>
      <Box sx={{ backgroundColor: 'white', p: 2, borderRadius: 2, mt: 2, mb: 3 }}>
        <Typography variant="body1" color="#330080" sx={{ fontWeight: 'bold' }}>
          {project.lead.name}
        </Typography>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOpenUserProfile(project.lead);
          }}
          sx={{ color: '#330080', textDecoration: 'none', '&:hover': { color: 'red' } }}
        >
          View Profile
        </Link>
      </Box>

      {/* Contributors List */}
      <ContributorsList project={project} handleViewProfile={handleOpenUserProfile} />

      {/* Applicants Section */}
      {/* Applicants Section */}
      {project.applicants.length > 0 && (
    <>
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
        Applications:
      </Typography>
      <Box
        sx={{
          maxHeight: '200px',
          overflowY: 'auto',
          pr: 1,
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#aaa', borderRadius: '3px' },
          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#888' },
        }}
      >
        {project.applicants.map((applicant, index) => (
          <Box key={index} className="bg-white p-1 mb-1 rounded-lg flex justify-between items-center">
            <Box className="flex flex-col items-start">
            <p className="font-semibold text-[#330080]">{applicant.name}</p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleOpenUserProfile(applicant);
                }}
                className="text-sm text-[#330080] no-underline hover:text-red-500"
              >
                View Profile  
              </a>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                color="success"
                sx={{ fontSize: '0.75rem', py: 0.5, px: 1, minWidth: 'auto' }}
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
                sx={{ fontSize: '0.75rem', py: 0.5, px: 1, minWidth: 'auto' }}
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
  {/* Edit and Delete Section (Fixed to Stay Below) */}
  


      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={showUserProfileModal}
        onClose={handleCloseUserProfile}
        userDetails={selectedUser}
      />
    </Box>
  );
};

export default React.memo(ProjectDetails);
import React from 'react';
import { Modal, Box, Typography, Button, IconButton, Fade } from '@mui/material';
import { GitHub, LinkedIn, Close } from '@mui/icons-material';

const UserProfileModal = ({ isOpen, onClose, userDetails }) => {
  return (
    <Modal open={isOpen} onClose={onClose} closeAfterTransition onClick={(e) => e.stopPropagation()}>
      <Fade in={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 450 }, // Wider for modern look
            maxWidth: '95%',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            overflow: 'hidden',
            p: 4,
            animation: '0.3s ease-out fadeSlideIn',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'black' }}>
              User Profile
            </Typography>
            <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
              <Close />
            </IconButton>
          </Box>
          {userDetails ? (
            <React.Fragment>
              <Typography variant="body1" sx={{ mb: 1, color: 'black' }}>
                <strong>Name:</strong> {userDetails.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: 'black' }}>
                <strong>Email:</strong> {userDetails.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: 'black' }}>
                <strong>Roll Number:</strong> {userDetails.rollNumber}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1, color: 'black' }}>
                <strong>Phone Number:</strong> {userDetails.phoneNumber}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <GitHub sx={{ color: 'text.primary', mr: 1 }} />
                <Typography 
                  variant="body1" 
                  component="a" 
                  href={userDetails.githubProfile} 
                  target="_blank" 
                  rel="noreferrer" 
                  sx={{ textDecoration: 'none', color: 'black' }}
                >
                  {userDetails.githubProfile}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LinkedIn sx={{ color: 'text.primary', mr: 1 }} />
                <Typography 
                  variant="body1" 
                  component="a" 
                  href={userDetails.linkedinUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  sx={{ textDecoration: 'none', color: 'black' }}
                >
                  {userDetails.linkedinUrl}
                </Typography>
              </Box>
            </React.Fragment>
          ) : (
            <Typography variant="body2" sx={{ textAlign: 'center', color: 'black' }}>No user details available.</Typography>
          )}
          <Button onClick={onClose} fullWidth variant="contained" sx={{ mt: 3, bgcolor: '#330075', color: 'white' }}>
            Close
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default React.memo(UserProfileModal);

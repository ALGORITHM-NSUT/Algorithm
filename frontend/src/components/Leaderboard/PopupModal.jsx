import React from 'react'
import { Modal, Box, Typography, Button, IconButton, Fade } from '@mui/material';
import { GitHub, LinkedIn, Close } from '@mui/icons-material';

const PopupModal = ({ isOpen, onClose, content, title }) => {
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
              {title || 'Modal Title'}
            </Typography>
            <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
              <Close />
            </IconButton>
          </Box>
          <Box sx={{ mb: 2, color: 'black' }}>
            {content || <Typography variant="body2" sx={{ textAlign: 'center', color: 'black' }}>No content available.</Typography>}
          </Box>
          <Button onClick={onClose} fullWidth variant="contained" sx={{ mt: 3, bgcolor: '#330075', color: 'white' }}>
            Close
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PopupModal;

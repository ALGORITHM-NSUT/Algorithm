import React from 'react';
import { Dialog, DialogContent, DialogActions, Typography, Button, IconButton, Box } from '@mui/material';
import { Close as CloseIcon, Send as SendIcon, Cancel as CancelIcon } from '@mui/icons-material';

const JoinRequestModal = ({ isOpen, project, onClose, onSend }) => {
  const handleSend = (e) => {
    e.stopPropagation();
    onSend(); // Call the parent's onSend function with the message
    onClose(e); // Close the modal
  };

  // Return null if project is not defined
  if (!project) return null;

  return (
    <Dialog
      onClick={(e) => e.stopPropagation()}
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: 6,
        }
      }}
    >
      <DialogContent>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
            }}
          >
            Join Project: <br /> {project.title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Confirmation Text */}
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 3
          }}
        >
          Are you sure you want to request to join this project? Once submitted, the request will be sent for review.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          justifyContent: 'center'
        }}
      >
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSend}
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 3,
            px: 4
          }}
        >
          Send Request
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<CancelIcon />}
          onClick={onClose}
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: 3,
            px: 4
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinRequestModal;

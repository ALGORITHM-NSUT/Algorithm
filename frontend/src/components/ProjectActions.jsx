import React from 'react';
import { Grid } from '@mui/material';

const ProjectActions = ({ isOngoing, user, project, handleJoinRequest, navigate }) => {
  // Reusable Button Component
  const ActionButton = ({ children, onClick, disabled, className, href }) => (
    <button
      className={`mt-2 py-2 px-4 rounded-lg w-full ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={href ? { cursor: 'pointer' } : {}}
    >
      {children}
    </button>
  );

  const renderOngoingActions = () => {
    if (user) {
      if (project.applicable && project.lead._id !== user._id) {
        return user.githubProfile ? (
          <ActionButton
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleJoinRequest}
          >
            Request to Join
          </ActionButton>
        ) : (
          <ActionButton
            className="bg-[#330080] text-white cursor-not-allowed"
            disabled
          >
            Add Github to apply
          </ActionButton>
        );
      } else {
        return (
          <ActionButton
            className="bg-[#330080] text-white cursor-not-allowed"
            disabled
          >
            Already Applied
          </ActionButton>
        );
      }
    } else {
      return (
        <ActionButton
          className="bg-[#40199a] text-white hover:bg-green-800"
          onClick={() => navigate('/login')}
        >
          Login to apply
        </ActionButton>
      );
    }
  };

  return (
    <React.Fragment>
      {isOngoing ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {renderOngoingActions()}
          </Grid>
          <Grid item xs={12} sm={6}>
            <a href={project.githubUrl} rel="noreferrer" target="_blank">
              <ActionButton
                className="bg-[#40199a] hover:bg-[#330080] text-white"
                onClick={(e) => e.stopPropagation()}
              >
                View on GitHub
              </ActionButton>
            </a>
          </Grid>
        </Grid>
      ) : (
        <a href={project.githubUrl} rel="noreferrer" target="_blank">
          <ActionButton
            className="bg-[#40199a] hover:bg-[#330080] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            View on GitHub
          </ActionButton>
        </a>
      )}
    </React.Fragment>
  );
};

export default ProjectActions;

import React from 'react';
import { Grid, Button, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ContributorsList = ({ project, handleViewProfile }) => {
  if (project.contributors.length === 0) return null;  // Return nothing if no contributors

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-white">Contributors:</h2>
      <Grid
        container
        spacing={2}
        sx={{
          mb: 3,
          maxHeight: '240px',
          overflowY: 'auto',
          pr: 1,
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#aaa',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#888',
          },
        }}
      >
        <div className="overflow-y-auto grid grid-cols-2 gap-2 rounded-lg shadow-sm ml-4 w-full">
          {project.contributors.map((contributor, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded-lg shadow-sm w-full"
            >
              <p className="text-[#330080] truncate w-[100px] md:w-full">{contributor.name}</p>
              <Tooltip title="View Profile" arrow>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleViewProfile(contributor);
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
                    alignItems: 'center',
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 16, mr: 1 }} />
                  View Profile
                </Button>
              </Tooltip>
            </div>
          ))}
        </div>
      </Grid>
    </div>
  );
};

export default ContributorsList;

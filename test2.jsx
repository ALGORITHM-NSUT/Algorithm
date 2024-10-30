

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const AddProject = ({ refreshProjects, showadd = false, edit, setEditState, project }) => {
  const [showForm, setShowForm] = useState(false);
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    lead: '',
    contributors: [],
    githubUrl: '',
  });

  useEffect(() => {
    setShowForm(edit);
  }, [edit]);

  useEffect(() => {
    if (project) {
      setProjectData({
        title: project.title,
        description: project.description,
        githubUrl: project.githubUrl,
        contributors: project.contributors.map((contributor) => contributor.email),
        lead: project.lead._id,
      });
    }
  }, [project, showForm]);

  const resetProjectData = () => {
    setProjectData({
      title: '',
      description: '',
      lead: '',
      contributors: [],
      githubUrl: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/addProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ projectData }),
      });
      await response.json();
      refreshProjects();
      handleCancel();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const updateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/updateProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ projectData }),
      });
      await response.json();
      refreshProjects();
      handleCancel();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleAddContributor = () => {
    setProjectData((prevData) => ({
      ...prevData,
      contributors: [...prevData.contributors, ''],
    }));
  };

  const handleContributorChange = (index, value) => {
    const updatedContributors = [...projectData.contributors];
    updatedContributors[index] = value;
    setProjectData((prevData) => ({
      ...prevData,
      contributors: updatedContributors,
    }));
  };

  const handleRemoveContributor = (index) => {
    const updatedContributors = [...projectData.contributors];
    updatedContributors.splice(index, 1);
    setProjectData((prevData) => ({
      ...prevData,
      contributors: updatedContributors,
    }));
  };

  const handleCancel = () => {
    setShowForm(false);
    if (setEditState) setEditState(false);
    if (!project) resetProjectData();
  };

  return (
    <div className="relative flex items-center">
      {showadd && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(!showForm)}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            fontSize: '2rem',
          }}
        >
          <span>+</span>
        </Button>
      )}

      {showForm && (
        <span onClick={(e) => e.stopPropagation()}>
          <Box
            className="absolute w-full top-0 left-0 p-4 shadow-lg z-10"
            sx={{
              backgroundColor: 'rgba(25, 30, 46, 0.7)', // Semi-transparent background
              backdropFilter: 'blur(20px)',
            }}
          >
            <Typography variant="h5" className="font-bold mb-4">
              {project ? 'Update Project' : 'Add New Project'}
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCancel}
                aria-label="close"
                sx={{ position: 'absolute', top: 10, right: 10 }}
              >
                <CloseIcon />
              </IconButton>
            </Typography>

            <form onSubmit={(e) => (project ? updateProject(e) : handleSubmit(e))}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={projectData.title}
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Lead"
                variant="outlined"
                fullWidth
                value={projectData.lead}
                onChange={(e) => setProjectData({ ...projectData, lead: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="GitHub URL"
                variant="outlined"
                fullWidth
                value={projectData.githubUrl}
                onChange={(e) => setProjectData({ ...projectData, githubUrl: e.target.value })}
                sx={{ mb: 2 }}
              />
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Contributors:
              </Typography>
              <Box sx={{ maxHeight: '120px', overflowY: 'auto', mb: 2 }}>
                {projectData.contributors.map((contributor, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TextField
                      variant="outlined"
                      value={contributor}
                      onChange={(e) => handleContributorChange(index, e.target.value)}
                      fullWidth
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label="Remove"
                      color="error"
                      onClick={() => handleRemoveContributor(index)}
                      sx={{ cursor: 'pointer' }}
                    />
                  </Box>
                ))}
              </Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddContributor}
                sx={{ mb: 2 }}
              >
                Add Contributor
              </Button>

              {/* Form buttons */}
              <Box className="flex justify-end">
                <Button onClick={handleCancel} color="default" sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  {project ? 'Update Project' : 'Add Project'}
                </Button>
              </Box>
            </form>
          </Box>
        </span>
      )}
    </div>
  );
};

export default AddProject;

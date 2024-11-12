import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Grow,
  Snackbar,
  Alert,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/system';

const primaryColor = '#330075';
const secondaryColor = '#4a007a';
const whiteColor = '#ffffff';
const overlayColor = 'rgba(0, 0, 0, 0.5)';

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: primaryColor,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: primaryColor,
    },
    '&:hover fieldset': {
      borderColor: secondaryColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: primaryColor,
    },
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: primaryColor,
  color: whiteColor,
  borderRadius: '20px',
  padding: '10px 20px',
  '&:hover': {
    backgroundColor: secondaryColor,
  },
}));

const AddProject = ({ refreshProjects, showadd = false, edit, setEditState, project }) => {
  const [showForm, setShowForm] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {

    setShowForm(edit);
  }, [edit])
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    lead: '',
    contributors: [],
    githubUrl: '',
    images: [],
    updateImages: []
  });

  useEffect(() => {
    if (project) {
      projectData.title = project.title;
      projectData.description = project.description;
      projectData.githubUrl = project.githubUrl;
      projectData.contributors = project.contributors.map((contributor) => contributor.email);
      projectData.lead = project.lead._id;
      projectData.images = project.images || [];
      projectData.updateImages = [];
      projectData.status = project.status || 0;
      projectData.liveLink = project.liveLink
    }
  }, [project, showForm]);

  const resetProjectData = () => {
    setProjectData({
      title: '',
      description: '',
      lead: '',
      contributors: [],
      githubUrl: '',
      images: [],
      status: 0
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProjectData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...projectData.images];
    updatedImages.splice(index, 1);
    setProjectData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in projectData) {
      if (Array.isArray(projectData[key])) {
        projectData[key].forEach((value) => {
          formData.append(key, value);
        });
      } else {
        formData.append(key, projectData[key]);
      }
    }
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/addProject`, {
        method: 'POST',
        credentials: "include",
        body: formData
      });
      const data = await response.json();
      if (response.status === 201) {
        refreshProjects();
        handleCancel();
        handleSnackbarOpen(data.message);
      }
      else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const updateProject = async (e) => {
    e.preventDefault();
    projectData.updateImages = projectData.images.filter(image => typeof image !== 'string');
    projectData.images = projectData.images.filter(image => typeof image === 'string');
    const formData = new FormData();
    for (const key in projectData) {
      if (Array.isArray(projectData[key])) {
        if (projectData[key].length === 0) {
          formData.append(key, []);  // Append an empty array as a string
        } else {
          projectData[key].forEach((value) => {
            formData.append(key, value);
          });
        }
      } else {
        formData.append(key, projectData[key]);
      }
    }
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/updateProject', {
        method: 'POST',
        credentials: "include",
        body: formData
      });
      const data = await response.json();
      if (response.status === 200) {
        refreshProjects();
        handleCancel();
        handleSnackbarOpen(data.message);
      }
      else {
        alert(data.message);
      }

    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  // Handle contributor input change
  const handleContributorChange = (index, value) => {
    const updatedContributors = [...projectData.contributors];
    updatedContributors[index] = value;
    setProjectData((prevData) => ({
      ...prevData,
      contributors: updatedContributors
    }));
  };

  // Remove a contributor field
  const handleRemoveContributor = (index) => {
    const updatedContributors = [...projectData.contributors];
    updatedContributors.splice(index, 1);
    setProjectData((prevData) => ({
      ...prevData,
      contributors: updatedContributors
    }));
  };

  // Handle form cancel (close form and reset)
  const handleCancel = () => {
    setShowForm(false); // Close form
    if (setEditState) setEditState(false);
    if (!project) resetProjectData(); // Reset fields
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (e) => {
    e.stopPropagation();
    setSnackbarOpen(false);
  };

  return (
    <div>
     
      {showadd && (
        <div
          className="absolute inset-0 w-full h-auto bg-gray-700/30 rounded-2xl shadow-lg cursor-pointer flex items-center justify-center text-white align-middle hover:bg-gray-700/60 backdrop-blur-xl transition duration-300 ease-in-out transform z-10"
          onClick={() => setShowForm(!showForm)}
        >
          <span className="text-5xl">+</span>
        </div>
      )}


      {showForm && (
        <span onClick={(e) => e.stopPropagation()} className='h-fit'>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: overlayColor,
              zIndex: 1000,
            }}
          />
          <Box
            component="form"
            onSubmit={(e) => (project ? updateProject(e) : handleSubmit(e))}
            sx={{
              position: 'absolute',
              top: '0%',
              left: '0%',
              width: '100%',
              minHeight: '100%',
              height: 'auto',
              maxWidth: '600px',
              p: 4,
              backgroundColor: whiteColor,
              borderRadius: '12px',
              boxShadow: 5,
              zIndex: 1001,
              transition: 'transform 0.3s ease-in-out',
              border: `2px solid ${primaryColor}`,
            }}
          >
            <Box display={'flex'} justifyContent="space-between">
              <Typography variant="h5" sx={{ color: primaryColor, fontWeight: 'bold', mb: 2 }}>
                {project ? 'Edit Project' : 'Add New Project'}
              </Typography>
              {project && <StyledButton variant="contained" component="span" sx={{ mb: 2 }} onClick={(e) => {
                projectData.status = !project.status;
                updateProject(e);
              }}>
                {!project.status ? 'Compelete' : 'Ongoing'}
              </StyledButton>}
            </Box>
            {/* Project form */}

            <Grow in={true} timeout={600}>
              <CustomTextField
                label="Title"
                fullWidth
                value={projectData.title}
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                disabled={!!project}
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: { borderRadius: '10px' },
                }}
              />
            </Grow>

            <Grow in={true} timeout={800}>
              <CustomTextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: { borderRadius: '10px' },
                }}
              />
            </Grow>

            <Grow in={true} timeout={1000}>
              <CustomTextField
                label="Lead"
                fullWidth
                value={project?.lead.name}
                onChange={(e) => setProjectData({ ...projectData, lead: e.target.value })}
                disabled={!!project}
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: { borderRadius: '10px' },
                }}
              />
            </Grow>

            <Grow in={true} timeout={1200}>
              <CustomTextField
                label="GitHub URL"
                fullWidth
                value={projectData.githubUrl}
                onChange={(e) => setProjectData({ ...projectData, githubUrl: e.target.value })}
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: { borderRadius: '10px' },
                }}
              />
            </Grow>

            <Grow in={true} timeout={1400}>
              <CustomTextField
                label="Live Link"
                fullWidth
                value={projectData.liveLink}
                onChange={(e) => setProjectData({ ...projectData, liveLink: e.target.value })}
                margin="normal"
                variant="outlined"
                InputProps={{
                  style: { borderRadius: '10px' },
                }}
              />
            </Grow>

            <Box>

              {projectData.contributors.length != 0 && <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Contributors
              </Typography>}
              {projectData.contributors.map((contributor, index) => (
                <Box display="flex" alignItems="center" key={index}>
                  <Grow in={true} timeout={1600}>
                    <CustomTextField
                      label={`Contributor ${index + 1}`}
                      fullWidth
                      value={contributor}
                      onChange={(e) => handleContributorChange(index, e.target.value)}
                      margin="normal"
                      variant="outlined"
                      InputProps={{
                        style: { borderRadius: '10px' },
                      }}
                    />
                  </Grow>
                  <IconButton onClick={() => handleRemoveContributor(index)} sx={{ ml: 1 }}>
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>

            <Box>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Project Images
              </Typography>
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                multiple
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <StyledButton variant="contained" component="span" startIcon={<AddIcon />} sx={{ mt: 1 }}>
                  Upload Images
                </StyledButton>
              </label>
              <Grid container spacing={2} mt={2}>
                {projectData.images.map((image, index) => (
                  <Grid item xs={4} key={index}>
                    <Box position="relative">

                      <img
                        src={typeof (image) === 'string' ? image : URL.createObjectURL(image)}
                        alt={`Project Image ${index + 1}`}
                        style={{ width: '100%', borderRadius: '8px' }}
                      />
                      <IconButton
                        onClick={() => handleRemoveImage(index)}
                        sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Form buttons */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <StyledButton variant="contained" type="submit">
                {project ? 'Update Project' : 'Add Project'}
              </StyledButton>
              <StyledButton variant="outlined" onClick={handleCancel}>
                Cancel
              </StyledButton>
            </Box>
          </Box>
        </span>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={(e) => { handleSnackbarClose(e) }}>
        <Alert onClose={(e) => { handleSnackbarClose(e) }} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProject;
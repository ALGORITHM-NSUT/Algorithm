

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
  Box,
  IconButton,
} from "@mui/material";
import { GitHub, Code, MailOutline, Phone } from "@mui/icons-material";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import cartoonProfile from "../assets/cartoon-profile.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Custom Material UI Theme for a fun look
const theme = createTheme({
  palette: {
    primary: {
      main: "#4c56d7", // Vibrant purple-blue
    },
    secondary: {
      main: "#ff4081", // Pink
    },
    background: {
      default: "#4c56d7", // Fun gradient
      paper: "#ffffff", // Card background
    },
    text: {
      primary: "#000000", // White text for contrast
      secondary: "#000000", // Black text inside forms and cards
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Modern, professional font
  },
});

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    nsutEmail: "",
    personalEmail: "",
    phoneNumber: "",
    githubProfile: "",
    leetcodeProfile: "",
    codeforcesProfile: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        navigate("/");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className="flex flex-col min-h-screen  bg-[#191e2e]"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <Navbar />
        <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 8 }}>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
          >
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: cartoonProfile, // Fun cartoon animation
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={150}
              width={150}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Paper elevation={6} sx={{ padding: 4, borderRadius: "12px" }}>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="primary"
                gutterBottom
                sx={{
                  fontFamily: "'Roboto', sans-serif", // Professional font
                  color: theme.palette.secondary.main, // Pink accent color
                }}
              >

              </Typography>
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography color="green" align="center" gutterBottom>
                    {successMessage}
                  </Typography>
                </motion.div>
              )}
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  {/* Name Field */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* NSUT Email Field */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="NSUT Email"
                      name="nsutEmail"
                      type="email"
                      value={formData.nsutEmail}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Personal Email Field */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Personal Email"
                      name="personalEmail"
                      type="email"
                      value={formData.personalEmail}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Phone Number Field */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* GitHub Profile Field */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="GitHub Profile"
                      name="githubProfile"
                      type="url"
                      value={formData.githubProfile}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* LeetCode Profile Field */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="LeetCode Profile"
                      name="leetcodeProfile"
                      type="url"
                      value={formData.leetcodeProfile}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Codeforces Profile Field */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Codeforces Profile"
                      name="codeforcesProfile"
                      type="url"
                      value={formData.codeforcesProfile}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Password Field */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          padding: "12px",
                          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)", // Gradient background
                          borderRadius: "50px", // Rounded button
                          color: "#fff", // White text
                          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)", // Shadow for a floating effect
                        }}
                      >
                        Join Now!
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>


              </Box>
            </Paper>
          </motion.div>
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ProfileForm;

















import React, { useState } from 'react';

const AddProject = ({ onAddProject }) => {
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    lead: '',
    githubUrl: '',
    linkedinUrl: '',
    contributors: ['']
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(projectData); // Pass the project data to the parent component
    // Close the form
  };

  const handleAddContributor = () => {
    setProjectData((prevData) => ({
      ...prevData,
      contributors: [...prevData.contributors, '']
    }));
  };

  const handleContributorChange = (index, value) => {
    const updatedContributors = [...projectData.contributors];
    updatedContributors[index] = value;
    setProjectData((prevData) => ({
      ...prevData,
      contributors: updatedContributors
    }));
  };

  const handleRemoveContributor = (index) => {
    const updatedContributors = [...projectData.contributors];
    updatedContributors.splice(index, 1);
    setProjectData((prevData) => ({
      ...prevData,
      contributors: updatedContributors
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-300">Title:</label>
        <input
          type="text"
          value={projectData.title}
          onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
          className="w-full p-2 rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300">Description:</label>
        <textarea
          value={projectData.description}
          onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
          className="w-full p-2 rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300">Lead:</label>
        <input
          type="text"
          value={projectData.lead}
          onChange={(e) => setProjectData({ ...projectData, lead: e.target.value })}
          className="w-full p-2 rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300">GitHub URL:</label>
        <input
          type="text"
          value={projectData.githubUrl}
          onChange={(e) => setProjectData({ ...projectData, githubUrl: e.target.value })}
          className="w-full p-2 rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300">LinkedIn URL:</label>
        <input
          type="text"
          value={projectData.linkedinUrl}
          onChange={(e) => setProjectData({ ...projectData, linkedinUrl: e.target.value })}
          className="w-full p-2 rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300">Contributors:</label>
        {projectData.contributors.map((contributor, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={contributor}
              onChange={(e) => handleContributorChange(index, e.target.value)}
              className="w-full p-2 rounded text-black"
            />
            <button
              type="button"
              onClick={() => handleRemoveContributor(index)}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddContributor}
          className="text-blue-500"
        >
          Add Contributor
        </button>
      </div>
      <div className="flex justify-end">
        <button type="button" className="text-gray-500 mr-4">
          Cancel
        </button>
        <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">
          Add Project
        </button>
      </div>
    </form>
  );
};

export default AddProject;

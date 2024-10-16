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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import cartoonProfile from "../assets/cartoon-profile.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThreeScene from "../components/ThreeScene"; // Import ThreeScene

const theme = createTheme({
  palette: {
    primary: { main: "#3b3b98" },
    secondary: { main: "#ff4081" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#333333", secondary: "#555555" },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", borderRadius: "12px" } },
    },
  },
});

// FormField Component
const FormField = ({ label, name, type, value, onChange, required = false }) => (
  <Grid item xs={12} sm={6}>
    <TextField
      required={required}
      fullWidth
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      variant="outlined"
    />
  </Grid>
);

// YearSelection Component
const YearSelection = ({ value, onChange }) => (
  <Grid item xs={12}>
    <FormControl component="fieldset" required>
      <FormLabel component="legend">Year</FormLabel>
      <RadioGroup row name="year" value={value} onChange={onChange}>
        {["1st", "2nd", "3rd"].map((year) => (
          <FormControlLabel key={year} value={year} control={<Radio />} label={`${year} Year`} />
        ))}
      </RadioGroup>
    </FormControl>
  </Grid>
);

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
    linkedId: "",
    rollNumber: "",
    year: "",
  });

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
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message);
      if (response.ok) navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col min-h-screen relative overflow-hidden">
        <Navbar />
        {/*  Three.js Scene as background */}
        <ThreeScene style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100vh", zIndex: -1 }} />
        <Container component="main" maxWidth="md" className="mt-8 mb-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center mb-4"
          >
            <Lottie
              options={{
                loop: false,
                autoplay: true,
                animationData: cartoonProfile,
                rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
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
            <Paper elevation={3} className="p-6 rounded-lg bg-white">
              <div className=" mb-10">
              <Typography component="h1" variant="h4" align="center" color="#10111f" className="mb-8">
              Join Us
              </Typography>
              </div>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <FormField label="Name" name="name" value={formData.name} onChange={handleChange} required />
                  <FormField label="NSUT Email" name="nsutEmail" value={formData.nsutEmail} onChange={handleChange} required />
                  <FormField label="Personal Email" name="personalEmail" value={formData.personalEmail} onChange={handleChange} />
                  <FormField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
                  <FormField label="GitHub Profile" name="githubProfile" value={formData.githubProfile} onChange={handleChange} />
                  <FormField label="LeetCode Profile" name="leetcodeProfile" value={formData.leetcodeProfile} onChange={handleChange} />
                  <FormField label="Codeforces Profile" name="codeforcesProfile" value={formData.codeforcesProfile} onChange={handleChange} />
                  <FormField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                  <FormField label="LinkedIn ID" name="linkedId" value={formData.linkedId} onChange={handleChange} />
                  <FormField label="Roll Number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
                  <YearSelection value={formData.year} onChange={handleChange} />

                  <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </motion.div>
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ProfileForm;

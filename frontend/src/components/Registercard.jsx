import React, { useState, useEffect, useCallback, useContext } from "react";
import { UserContext } from "../auth/UserProvider";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
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

const theme = createTheme({
  palette: {
    primary: { main: "#3b3b98" },
    secondary: { main: "#ff4081" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#000000", secondary: "#000000" },
  },
  typography: {
    fontFamily: "sans-serif",
    h1: { fontWeight: 100 },
  },
});

// FormField Component
const FormField = React.memo(({ label, name, type, value, onChange, required = false, disabled = false }) => (
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
      disabled={disabled}
    />
  </Grid>
));

FormField.displayName = 'FormField';
// YearSelection Component
const YearSelection = React.memo(({ value, onChange }) => (
  <Grid item xs={12}>
    <FormControl component="fieldset" required>
      <FormLabel component="legend" sx={{ color: 'black' }}>Year</FormLabel>
      <RadioGroup row name="year" value={value} onChange={onChange}>
        {[1, 2, 3].map((year) => (
          <FormControlLabel
            key={year}
            value={year}
            control={<Radio />}
            label={`${year} Year`}
            sx={{ color: 'black' }} // Set label color to black
          />
        ))}
      </RadioGroup>
    </FormControl>
  </Grid>
));


YearSelection.displayName = 'YearSelection';
const Register = ({ setEditForm, setEditAcc }) => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    personalEmail: user?.personalEmail || "",
    phoneNumber: user?.phoneNumber || "",
    githubProfile: user?.githubProfile || "",
    leetcodeProfile: user?.leetcodeProfile || "",
    codeforcesProfile: user?.codeforcesProfile || "",
    password: "",
    linkedinUrl: user?.linkedinUrl || "",
    rollNumber: user?.rollNumber || "",
    year: user?.year || "",
  });

  const [playAnimation, setPlayAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setPlayAnimation(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const validateForm = (email, personalEmail, rollNumber, linkedinUrl, phoneNumber) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const rollNumberPattern = /^[a-zA-Z0-9]{11}$/;
    if (!email.endsWith("@nsut.ac.in")) {
      alert("NSUT Email must end with @nsut.ac.in");
      return false;
    }
    if (!emailPattern.test(personalEmail)) {
      alert("Please enter a valid personal email address");
      return false;
    }
    if (!rollNumberPattern.test(rollNumber)) {
      alert("Please enter a valid roll number");
      return false;
    }
    if (!linkedinUrl.startsWith("https://www.linkedin.com/in/")) {
      alert("Please enter a valid linkedinUrl");
      return false;
    }
    
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid Phone Number");
      return false;
    }
    return true;
  }


  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    if (!validateForm(formData.email, formData.personalEmail, formData.rollNumber, formData.linkedinUrl, formData.phoneNumber)) {
      return;
    }
    if (githubProfile !== "" && !githubProfile.startsWith("https://github.com/")) {
      formData.githubProfile = "https://github.com/" + formData.githubProfile;
    }
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
      if (response.status === 201) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }, [formData, navigate]);

  const handleEdit = useCallback(async (event) => {
    event.preventDefault();
    if (!validateForm(formData.email, formData.personalEmail, formData.rollNumber, formData.githubProfile, formData.linkedinUrl, formData.phoneNumber)) {
      return;
    }
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/editProfile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
      if (response.status === 200) {
        setUser(data.user);
        canceledit();
      }

    } catch (error) {
      alert(`Network error: ${error.message}`);
    }
  }, [formData]);


  const canceledit = useCallback(() => {
    setEditForm(false);
    setEditAcc(false);
  }, [setEditForm, setEditAcc]);

  return (
    <ThemeProvider theme={theme}>
      <div className="mx-3 flex flex-col min-h-screen overflow-hidden mt-2 mb-2">
        <Container
          component="main"
          maxWidth="md"
          className="mx-3 mt-2 mb-2 rounded-2xl relative z-10 bg-white backdrop-blur-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div elevation={3} className="p-6 rounded-lg">
              <div className="mt-0 mb-1 flex justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="flex justify-center mb-2 mr-4 mt-0"
                >
                  <Lottie
                    options={{
                      loop: false,
                      autoplay: playAnimation,
                      animationData: cartoonProfile,
                      rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
                    }}
                    height={100}
                    width={100}
                  />
                </motion.div>
                <Typography component="h1" variant="h4" align="center" color="#10111f" className="mb-8">
                  {!user ? "Join Us" : "Edit Profile"}
                </Typography>
              </div>

              <form onSubmit={(e) => {
                if (!user) {
                  handleSubmit(e);
                } else {
                  handleEdit(e);
                }
              }}>
                <Grid container spacing={2}>
                  <FormField label="Name" name="name" value={formData.name} onChange={handleChange} required />
                  <FormField label="NSUT Email" name="email" value={formData.email} onChange={handleChange} required disabled={!!user} />
                  <FormField label="Personal Email" name="personalEmail" value={formData.personalEmail} onChange={handleChange} />
                  <FormField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
                  <FormField label="GitHub Profile" name="githubProfile" value={formData.githubProfile} onChange={handleChange} />
                  <FormField label="LeetCode Profile" name="leetcodeProfile" value={formData.leetcodeProfile} onChange={handleChange} />
                  <FormField label="Codeforces Profile" name="codeforcesProfile" value={formData.codeforcesProfile} onChange={handleChange} />
                  <FormField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required disabled={!!user} />
                  <FormField label="LinkedIn ID" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} required />
                  <FormField label="Roll Number" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
                  <YearSelection value={formData.year} onChange={handleChange} />

                  {setEditForm ? <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: "100%" }}
                      >
                        {user ? "Confirm" : "Register"}
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ width: "100%" }}
                        onClick={canceledit}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid> :
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ width: "100%" }}
                    >
                      {user ? "Confirm" : "Register"}
                    </Button>}
                </Grid>
              </form>
            </div>
          </motion.div>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Register;

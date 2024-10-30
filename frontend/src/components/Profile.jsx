import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Registercard';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  TextField
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userProfile')));
  const [editAcc, setEditAcc] = useState(false);
  const [password, setPassword] = useState('');
  const [editform, setEditForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    setPassword('');
    setUser(JSON.parse(localStorage.getItem('userProfile')));
  }, [editAcc, editform])

  const showpass = () => {
    setEditAcc(true);
  };

  const hidepass = () => {
    setEditAcc(false);
  };

  const submitpass = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for session management
        body: JSON.stringify({
          password
        }),
      });

      if (response.ok) {
        setEditForm(true);
        console.log("verified");
      } else {
        alert("Password does not match")
      }
    } catch (error) {
      console.error('Error verifying:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.clear();
        setUser(null);
        alert('Logged out successfully!');
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='h-fit flex-grow'>
      {editform && user && <Container maxWidth="md">
        <Register user={user} setEditForm={setEditForm} setEditAcc={setEditAcc} />
      </Container>}


      {!editform && user && (
        <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card
            sx={{
              width: '100%',
              padding: 3,
              borderRadius: 2,
              boxShadow: 4,
              position: 'relative',
              minHeight: '50vh',

            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}>
                {user.name.charAt(0)}
              </Avatar>
            </Box>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Welcome, {user.name}!
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: {user.email}
              </Typography>
            </CardContent>

            {/* Edit Account Section */}
            {editAcc && (
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  id="outlined-password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ width: '100%', marginBottom: 2 }}
                />
              </Box>
            )}

            {/* Buttons at the bottom */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {!editAcc && (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{ flex: 1, marginRight: 1 }}
                >
                  Logout
                </Button>
              )}
              {!editAcc && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  sx={{ flex: 1, marginLeft: 1 }}
                  onClick={showpass}
                >
                  Edit Account
                </Button>
              )}
              {editAcc &&
                <React.Fragment>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    sx={{ flex: 1, marginLeft: 1 }}
                    onClick={submitpass}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={hidepass}
                    sx={{ flex: 1, marginLeft: 1, marginRight: 1 }}
                  >
                    Cancel
                  </Button>

                </React.Fragment>
              }
            </Box>
          </Card>

        </Container>
      )}
    </div>
  );
};

export default Profile;

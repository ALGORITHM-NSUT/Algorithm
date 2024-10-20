import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userProfile')));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
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
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {user && (
        <Card
          sx={{
            width: '100%',
            padding: 3,
            borderRadius: 2,
            boxShadow: 4,
            position: 'relative',
            minHeight: '50vh', // Ensure enough space for buttons at the bottom
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Avatar
              sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
            >
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

          {/* Buttons at bottom corners */}
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
            <Button
              variant="contained"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ flex: 1, marginRight: 1 }}
            >
              Logout
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              sx={{ flex: 1, marginLeft: 1 }}
            >
              Edit Account
            </Button>
          </Box>
        </Card>
      )}
    </Container>
  );
};

export default Profile;

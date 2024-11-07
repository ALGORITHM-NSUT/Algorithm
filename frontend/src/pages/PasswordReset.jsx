import React, { useState } from 'react';
import {
  Card,
  Container,
  TextField,
} from '@mui/material';

const PasswordReset = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL+ `/changePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error sending password reset request:", error);
      setError("Failed to send reset request. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Card
        sx={{
          width: 'fit',
          padding: 3,
          paddingX: 10,
          borderRadius: 2,
          boxShadow: 4,

        }}
      >
        <div className="flex flex-col justify-center items-center w-full">
          <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
          {message ? (
            <p className="text-green-500">{message}</p>
          ) : (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ width: '100%' }}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Send Reset Link</button>
              <button type="button" onClick={onBack} className="text-sm text-blue-700 hover:underline mt-4">Back to Login</button>
            </form>
          )}
        </div>
      </Card>
    </Container >
  );
};

export default PasswordReset;
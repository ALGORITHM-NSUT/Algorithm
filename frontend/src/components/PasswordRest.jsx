import React, { useState } from 'react';

const PasswordReset = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/changePassword", {
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
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
      {message ? (
        <p className="text-green-500">{message}</p>
      ) : (
        <form onSubmit={handlePasswordReset} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900">Enter your email</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Send Reset Link</button>
          <button type="button" onClick={onBack} className="text-sm text-blue-700 hover:underline mt-4">Back to Login</button>
        </form>
      )}
    </div>
  );
};

export default PasswordReset;

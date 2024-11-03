import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PasswordReset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const param = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const url = `http://localhost:5000/resetpass/${param.id}`; // POST endpoint to reset password
      const { data } = await axios.post(url, { password: newPassword });
      setMessage(data.message || "Password updated successfully");
      // Optionally, navigate to the login page or another page
      setTimeout(() => {
        navigate('/login'); // Redirect after a delay
      }, 2000);
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Error updating password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Update Password
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;

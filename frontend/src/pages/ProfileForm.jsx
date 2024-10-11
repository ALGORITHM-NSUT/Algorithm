import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput.jsx";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    nsutEmail: "",
    personalEmail: "",
    phoneNumber: "",
    githubProfile: "",
    leetcodeProfile: "",
    codeforcesProfile: "",
    password: "", // New password field
  });

  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // For redirecting after submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

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
        // If submission is successful, show an alert and redirect
        alert(result.message);
        navigate("/"); // Redirect to the home page
      } else {
        alert(result.message)
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#191e2e]">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4 bg-polygon bg-cover bg-center bg-no-repeat">
        <div className="bg-gray-100 rounded-lg shadow-lg p-10 w-11/12 md:w-7/12 lg:w-7/12 mt-12 mb-24">
          <h2 className="text-4xl font-bold text-center text-[#4c56d7] mb-6">
            Join Us Form
          </h2>
          {successMessage && (
            <p className="text-green-500 text-center mb-4">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormInput
              label="NSUT Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Personal Email"
              type="email"
              name="personalEmail"
              value={formData.personalEmail}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <FormInput
              label="GitHub Profile"
              type="url"
              name="githubProfile"
              value={formData.githubProfile}
              onChange={handleChange}
            />
            <FormInput
              label="LeetCode Profile"
              type="url"
              name="leetcodeProfile"
              value={formData.leetcodeProfile}
              onChange={handleChange}
            />
            <FormInput
              label="Codeforces Profile"
              type="url"
              name="codeforcesProfile"
              value={formData.codeforcesProfile}
              onChange={handleChange}
            />
            <FormInput
              label="Password"  // New password field
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/3 mt-9 py-3 bg-[#4c56d7] text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileForm;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OpacityLoader from './Loaders/OpacityLoader';
import PasswordReset from './PasswordRest';

const Login = ({setUser}) => {
  let [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const remember = document.getElementById('remember').checked;
    setLoading(true); // Show loader when request starts
    email = email.toLowerCase()
    
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          remember
        }),
      });

      const data = await response.json();
      setLoading(false); // Hide loader when request completes

      if (response.ok) {
        alert('Login successful!');
        setUser(data.user);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Something went wrong. Please try again.");
      setLoading(false); // Hide loader in case of error
    }
  };

  if (showReset) {
    return <PasswordReset onBack={() => setShowReset(false)} />;
  }

  return (
    <div className="mx-3 flex justify-center items-center h-screen">
      {loading ? ( // Show loader if loading is true
        <OpacityLoader />
      ) : (
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-lg shadow-lg overflow-hidden">
            {/* Left side: Login form */}
            <div className="bg-white p-8 md:p-10 flex flex-col justify-center">
              <form className="space-y-6" onSubmit={handleLogin}>
                <h5 className="text-2xl text-center font-bold text-gray-900">
                  Sign In
                </h5>
                {errorMessage && (
                  <p className="text-red-500 text-center">{errorMessage}</p>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Your email (NSUT-Email-ID)
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-semibold text-gray-900"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Remember me
                  </label>
                  <button type="button" className="ms-auto text-sm text-blue-700 hover:underline" onClick={() => setShowReset(true)}>Lost Password?</button>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500">
                  Not registered?{' '}
                  <Link to={"/join-us"} className="text-blue-700 hover:underline">
                    Create account
                  </Link>
                </div>
              </form>
            </div>

            {/* Right side */}
            <div className="hidden md:flex md:flex-col md:justify-center md:items-center bg-gradient-to-br from-purple-900 to-blue-900 via-black p-8">
              <div className="relative z-10 flex flex-col mt-4 items-center mb-8 ">
                <div className="flex items-center justify-center mb-4 flex-wrap">
                  <img
                    src="/static/algo.png"
                    alt="Logo"
                    className="w-24 h-18 md:w-32 md:h-24 lg:w-40 lg:h-30 mr-4"
                  />
                  <h1 className="text-[2rem] sm:text-[4rem] md:text-[5rem] lg:text-[4rem] text-gray-200 font-bold mt-2 font-sans">
                    Algorithm
                  </h1>
                </div>
                <div className="text-gray-300 font-bold text-center mb-4">
                  <p className="text-xl lg:text-3xl">Code . Set . Go</p>
                </div>
                <p className="text-lg sm:text-xl max-w-lg text-gray-400 text-center mb-8 px-4 font-sans">
                  Join us to explore, learn, and innovate together!
                </p>
              </div>
            </div>
          </div>
        
      )}
    </div>
  );
};

export default Login;

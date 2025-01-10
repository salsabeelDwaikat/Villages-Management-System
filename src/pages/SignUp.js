import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // Import axios for making API requests

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!fullName || !username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long, include uppercase and lowercase letters, and contain at least one symbol.'
      );
      return;
    }

    try {
      // Send a POST request to the GraphQL endpoint
      const response = await axios.post('http://localhost:5000/graphql', {
        query: `
          mutation {
            signup(username: "${username}", password: "${password}", role: "user") {
              token
              user {
                id
                username
                role
              }
            }
          }
        `,
      });

      // Check for errors in the GraphQL response
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      // If sign-up is successful, redirect to the login page
      console.log('User created:', response.data.data.signup);
      navigate('/login');
    } catch (err) {
      // Handle errors (e.g., username already exists, server issues)
      setError(err.message || 'Failed to create user. Please try again.');
      console.error('Sign-up error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Password must be at least 8 characters long, include uppercase and lowercase letters, and contain at least one symbol.
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:text-blue-400">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
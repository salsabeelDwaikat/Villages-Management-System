import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login successful!');
    window.location.href = '/'; // Navigate to home page after login
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1e1e2f]">
      <div className="bg-[#2c2c3d] p-8 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-[#76c7c0] text-2xl mb-6 text-center">Login</h2>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="text-sm text-[#d0d0d0] block mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              className="w-full p-3 border border-[#444] rounded bg-[#2a2a3d] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#76c7c0]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-6 relative"> 
            <label htmlFor="password" className="text-sm text-[#d0d0d0] block mb-2">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'} // Show password if showPassword is true
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full p-3 pr-12 border border-[#444] rounded bg-[#2a2a3d] text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#76c7c0]" // Added pr-12 to create space for icon
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2/3 transform -translate-y-1/2 text-[#76c7c0] focus:outline-none"
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i> // Icon for password hidden
              ) : (
                <i className="fas fa-eye"></i> // Icon for password visible
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#76c7c0] text-[#1e1e2f] rounded mt-4 hover:bg-[#66b1b0] transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-sm text-[#d0d0d0]">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#76c7c0] font-bold hover:text-[#66b1b0] transition duration-300">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

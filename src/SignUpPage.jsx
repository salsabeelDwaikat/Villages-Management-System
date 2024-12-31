import React, { useState } from 'react';

const SignUpPage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Sign-up successful!');
    window.location.href = '/login'; // Navigate to login page
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen bg-background-color">
      <div className="signup-card bg-card-background p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-primary-color text-2xl mb-4">Sign Up</h2>
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="fullName" className="text-sm text-text-color">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              required
              className="w-full p-2 mt-2 border border-border-color rounded bg-darken-card-background text-text-color"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="username" className="text-sm text-text-color">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username"
              required
              className="w-full p-2 mt-2 border border-border-color rounded bg-darken-card-background text-text-color"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-4 relative"> {/* Make parent div relative for icon positioning */}
            <label htmlFor="password" className="text-sm text-text-color">Password</label>
            <input
              type={showPassword ? 'text' : 'password'} // Show password if showPassword is true
              id="password"
              name="password"
              placeholder="Enter a password"
              required
              className="w-full p-2 mt-2 pr-12 border border-border-color rounded bg-darken-card-background text-text-color" // Added pr-12 to create space for icon
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
          <button type="submit" className="w-full p-3 bg-[#76c7c0] text-[#1e1e2f] rounded mt-4 hover:bg-[#66b1b0] transition duration-300">
            Sign Up
          </button>
        </form>
        <p className="login-prompt mt-4 text-sm text-text-color">
          Already have an account? <a href="/login" className="login-btn text-primary-color font-bold">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;

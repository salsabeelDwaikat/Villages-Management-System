import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Overview from './pages/Overview';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/" element={<Overview  />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
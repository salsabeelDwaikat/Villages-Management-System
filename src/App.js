import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './SignUpPage'; 
import LoginPage from './LoginPage'; 
import OverviewPage from './OverviewPage'
import './index.css'; 
import 'font-awesome/css/font-awesome.min.css';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<OverviewPage />} />

      </Routes>
    </Router>
  );
};

export default App;

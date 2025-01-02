import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './SignUpPage'; 
import LoginPage from './LoginPage'; 
import OverviewPage from './OverviewPage'
import './index.css'; 
import 'font-awesome/css/font-awesome.min.css';
import Sidebar from './components/Sidebar/Sidebar';
import VillageManagement from './components/VillageManagement/VillageManagement';
import AddVillage from './components/AddVillage/AddVillage';
import UpdateVillage from './components/UpdateVillage/UpdateVillage'
import AddDemo from './components/AddDemo/AddDemo';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage />} /> 
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/" element={<OverviewPage />} /> */}
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/villagemanagement" element={<VillageManagement />} />
        <Route path="/AddVillage" element={<AddVillage />} />
        <Route path="/UpdateVillage" element={<UpdateVillage />} />
        <Route path="/AddDemo" element={<AddDemo />} />

      </Routes>
    </Router>
  );
};

export default App;

// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home page shows ticket form + list */}
        <Route path="/" element={
          <>
            <TicketForm />
            <TicketList />
          </>
        } />

        {/* Admin dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Optional standalone raise ticket page */}
        <Route path="/raise-ticket" element={<TicketForm />} />
      </Routes>
    </>
  );
};

export default App;

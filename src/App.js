import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AdminPage from './Pages/AdminPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default App;
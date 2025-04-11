// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Homepage from './components/Homepage';
import CoursesPage from './components/CoursesPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
          
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/courses" element={  <ProtectedRoute> <CoursesPage /> </ProtectedRoute>}/>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          
          
      </Router>
    </AuthProvider>
  );
}

export default App;

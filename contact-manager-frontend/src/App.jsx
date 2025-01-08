import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContactProvider } from './context/ContactContext';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ContactList from './components/Contacts/ContactList';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <ContactProvider>{children}</ContactProvider>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/contacts" 
                element={
                  <ProtectedRoute>
                    <ContactList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/" 
                element={
                  localStorage.getItem('token') ? 
                  <Navigate to="/contacts" /> : 
                  <Navigate to="/login" />
                } 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
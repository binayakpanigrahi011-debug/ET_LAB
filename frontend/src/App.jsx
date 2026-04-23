import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import SeatSelection from './pages/SeatSelection';
import MyBookings from './pages/MyBookings';
import Admin from './pages/Admin';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user || !user.isAdmin) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<div className="container" style={{ padding: '2rem 1rem' }}><Login /></div>} />
          <Route path="/register" element={<div className="container" style={{ padding: '2rem 1rem' }}><Register /></div>} />
          <Route path="/movie/:id" element={<div className="container" style={{ padding: '2rem 1rem' }}><MovieDetails /></div>} />
          <Route 
            path="/book/:id" 
            element={
              <ProtectedRoute>
                <div className="container" style={{ padding: '2rem 1rem' }}>
                  <SeatSelection />
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mybookings" 
            element={
              <ProtectedRoute>
                <div className="container" style={{ padding: '2rem 1rem' }}>
                  <MyBookings />
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <div className="container" style={{ padding: '2rem 1rem' }}>
                  <Admin />
                </div>
              </AdminRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

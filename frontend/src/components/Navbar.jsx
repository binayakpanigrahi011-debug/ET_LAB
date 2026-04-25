import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Film, LogOut, Ticket } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ background: 'rgba(0, 0, 0, 1)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(106, 137, 167, 0.2)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
          <Film color="var(--primary-color)" />
          <span style={{ color: 'white' }}>Quick<span style={{ color: 'var(--primary-color)' }}>Show</span></span>
        </Link>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {user ? (
            <>
              {user.isAdmin && <Link to="/admin" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Admin</Link>}
              <Link to="/mybookings" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'white' }}>
                <Ticket size={20} /> My Bookings
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Login</Link>
              <Link to="/register" className="btn btn-accent" style={{ padding: '0.5rem 1rem' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            <Film color="#ec4899" />
            <span>Quick<span style={{ color: '#ec4899' }}>Show</span></span>
          </Link>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Your premium destination for movie ticket bookings. Experience cinematic magic with real-time seat tracking and seamless bookings.
          </p>
        </div>
        
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Quick Links</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <li><Link to="/" className="hover:text-white transition-colors">Now Showing</Link></li>
            <li><Link to="/mybookings" className="hover:text-white transition-colors">My Bookings</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Gift Cards</Link></li>
            <li><Link to="#" className="hover:text-white transition-colors">Offers</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Connect With Us</h4>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)' }}>
            <a href="#" style={{ padding: '0.5rem', background: '#334155', borderRadius: '50%', width:'36px', height:'36px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold' }}>IG</a>
            <a href="#" style={{ padding: '0.5rem', background: '#334155', borderRadius: '50%', width:'36px', height:'36px', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold' }}>X</a>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #334155', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        &copy; {new Date().getFullYear()} QuickShow India. All rights reserved. Built as a mock application.
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Ticket, Calendar, Clock, MapPin } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('/bookings/mybookings');
        setBookings(res.data);
      } catch (error) {
        console.error('Error fetching bookings', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading tickets...</div>;

  return (
    <div className="animate-fade-in">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 'bold' }}>
        <Ticket size={40} color="#ec4899" /> My Tickets
      </h2>

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--card-bg)', borderRadius: '1rem' }}>
          <Ticket size={64} color="#334155" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Tickets Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>You haven't booked any movies yet. Grab some popcorn and book now!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {bookings.map(booking => (
            <div key={booking._id} className="ticket-stub">
              {/* Main Ticket Info */}
              <div className="ticket-main">
                <img 
                  src={booking.movie?.poster || 'https://via.placeholder.com/150'} 
                  alt={booking.movie?.title || 'Unknown'} 
                  style={{ width: '130px', height: '180px', objectFit: 'cover', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }} 
                />
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem', marginTop: '0.5rem' }}>{booking.movie?.title || 'Movie Deleted'}</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Show Timing</p>
                      <p style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}><Clock size={16} color="#6366f1" /> {booking.showTiming}</p>
                    </div>
                    <div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Cinema</p>
                      <p style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}><MapPin size={16} color="#ec4899" /> PVR, Bhubaneswar</p>
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', display: 'inline-block', width: 'fit-content' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Seats ({booking.seats.length})</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', wordSpacing: '5px' }}>{booking.seats.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Tear-off Ticket Side */}
              <div className="ticket-side">
                <div>
                  <p style={{ color: '#fff', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Admit {booking.seats.length}</p>
                  <Ticket size={48} color="#fff" style={{ opacity: 0.8, margin: '1rem 0' }} />
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Total Cost</p>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>₹{booking.totalCost}</h2>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: '2rem' }}>ID: {booking._id.substring(0, 8).toUpperCase()}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

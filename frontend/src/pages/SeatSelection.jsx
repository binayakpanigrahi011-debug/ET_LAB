import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Ticket } from 'lucide-react';

const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SEATS_PER_ROW = 10;
const TICKET_PRICE = 250; // INR 250

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [movie, setMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/movies/${id}`);
        setMovie(res.data);
        if (res.data.showTimings.length > 0) {
          setSelectedTime(res.data.showTimings[0]);
        }
      } catch (error) {
        console.error('Error fetching movie', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) return alert('Please select at least one seat');
    
    setBookingLoading(true);
    try {
      await axios.post('/bookings', {
        movie: movie._id,
        showTiming: selectedTime,
        seats: selectedSeats,
        totalCost: selectedSeats.length * TICKET_PRICE
      });
      navigate('/mybookings');
    } catch (error) {
      alert('Error creating booking');
      console.error(error);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="animate-fade-in">
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Book Tickets: {movie.title}</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Ticket Price: ₹{TICKET_PRICE} (Executive)</p>
      
      <div style={{ marginBottom: '2.5rem' }}>
        <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>1. Select Show Timing</h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {movie.showTimings.map(time => (
            <button 
              key={time} 
              onClick={() => setSelectedTime(time)}
              className={selectedTime === time ? 'btn btn-accent' : 'btn btn-outline'}
              style={{ fontSize: '1rem' }}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h4 style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.2rem' }}>2. Choose Your Seats</h4>
        
        <div style={{ background: '#1e293b', padding: '3rem 1rem', borderRadius: '1rem', maxWidth: '800px', margin: '0 auto', overflowX: 'auto' }}>
          {/* Screen curve */}
          <div style={{ height: '40px', background: 'linear-gradient(to bottom, #334155, transparent)', borderRadius: '50% 50% 0 0', marginBottom: '3rem', textAlign: 'center', paddingTop: '10px', fontSize: '0.9rem', color: '#94a3b8', letterSpacing: '5px' }}>
            ALL EYES THIS WAY
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            {SEAT_ROWS.map(row => (
              <div key={row} style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <span style={{ width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 'bold' }}>{row}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {[...Array(SEATS_PER_ROW)].map((_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const isSelected = selectedSeats.includes(seatId);
                    
                    // Add aisle gap after 5th seat
                    const isAisle = i === 4;
                    
                    return (
                      <React.Fragment key={seatId}>
                        <button
                          onClick={() => toggleSeat(seatId)}
                          style={{
                            width: '35px', height: '35px', 
                            borderRadius: '0.4rem 0.4rem 0.2rem 0.2rem',
                            border: '1px solid #0f172a',
                            borderBottom: '4px solid #0f172a', /* seat cushion effect */
                            cursor: 'pointer',
                            background: isSelected ? 'var(--accent-color)' : '#475569',
                            color: '#fff',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                            transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                          }}
                        >
                          {i + 1}
                        </button>
                        {isAisle && <div style={{ width: '20px' }}></div>}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Selected Seats: <strong style={{ color: '#fff' }}>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</strong></p>
          <p style={{ fontSize: '1.8rem', marginTop: '0.5rem', fontWeight: 'bold' }}>Total: <strong style={{ color: 'var(--accent-color)' }}>₹{selectedSeats.length * TICKET_PRICE}</strong></p>
        </div>
        <button 
          onClick={handleBooking} 
          disabled={selectedSeats.length === 0 || bookingLoading}
          className="btn btn-accent" 
          style={{ padding: '1rem 3rem', fontSize: '1.2rem', opacity: selectedSeats.length === 0 ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Ticket /> {bookingLoading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    title: '', duration: '', genre: '', showTimings: '10:00 AM, 02:00 PM'
  });
  const [posterFile, setPosterFile] = useState(null);

  const fetchDocs = async () => {
    try {
      const [moviesRes, bookingsRes] = await Promise.all([
        axios.get('/movies'),
        axios.get('/bookings')
      ]);
      setMovies(moviesRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!posterFile) return alert('Please upload a poster image');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('duration', formData.duration);
    data.append('genre', formData.genre);
    data.append('showTimings', formData.showTimings); // We parse this string in the backend
    data.append('poster', posterFile);

    try {
      await axios.post('/movies', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchDocs();
      setFormData({ title: '', duration: '', genre: '', showTimings: '10:00 AM, 02:00 PM' });
      setPosterFile(null);
      // Reset the file input manually by resetting the form
      e.target.reset();
      alert('Movie added');
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding movie');
      console.error('Error adding movie:', error);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (window.confirm('Delete this movie?')) {
      try {
        await axios.delete(`/movies/${id}`);
        fetchDocs();
      } catch (error) {
        alert('Error deleting movie');
      }
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Admin Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
        
        {/* ADD MOVIE FORM */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Add New Movie</h3>
          <form onSubmit={handleAddMovie}>
            <input className="input-field" type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <input className="input-field" type="file" accept="image/*" onChange={e => setPosterFile(e.target.files[0])} required />
            <input className="input-field" type="text" placeholder="Duration (e.g. 2h 15m)" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} required />
            <input className="input-field" type="text" placeholder="Genre" value={formData.genre} onChange={e => setFormData({...formData, genre: e.target.value})} required />
            <input className="input-field" type="text" placeholder="Show Timings (comma sep)" value={formData.showTimings} onChange={e => setFormData({...formData, showTimings: e.target.value})} required />
            <button className="btn" style={{ width: '100%' }}>Add Movie</button>
          </form>
        </div>

        <div>
          {/* MANAGE MOVIES */}
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Manage Movies</h3>
            {movies.map(movie => (
              <div key={movie._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(106, 137, 167, 0.2)' }}>
                <span>{movie.title}</span>
                <button onClick={() => handleDeleteMovie(movie._id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer' }}>Delete</button>
              </div>
            ))}
          </div>

          {/* VIEW ALL BOOKINGS */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Global Bookings</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {bookings.map(booking => (
                <div key={booking._id} style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(106, 137, 167, 0.2)', fontSize: '0.9rem' }}>
                  <strong>{booking.user?.name || 'Unknown User'}</strong> booked <strong>{booking.movie?.title || 'Unknown'}</strong> <br/>
                  Timing: {booking.showTiming} | Seats: {booking.seats.join(', ')} | ${booking.totalCost}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;

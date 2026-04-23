import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, Film, Star, Users } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (error) {
        console.error('Error fetching movie', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading movie details...</div>;
  if (!movie) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Movie not found</div>;

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
        <img 
          src={movie.poster} 
          alt={movie.title} 
          style={{ width: '100%', maxWidth: '350px', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', objectFit: 'cover' }} 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/350x550?text=No+Poster' }}
        />
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.2' }}>{movie.title}</h1>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#334155', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.9rem' }}>
              <Film size={18} color="#ec4899" /> {movie.genre}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#334155', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.9rem' }}>
              <Clock size={18} color="#6366f1" /> {movie.duration}
            </span>
          </div>

          {/* Description Section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>About the Movie</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#e2e8f0' }}>
              {movie.description || "No description provided for this movie yet."}
            </p>
          </div>

          <Link to={`/book/${movie._id}`} className="btn btn-accent" style={{ fontSize: '1.1rem', padding: '1rem 3rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={20} /> Book Tickets Now
          </Link>
        </div>
      </div>

      {/* Cast & Crew Section */}
      {movie.actors && movie.actors.length > 0 && (
        <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '1rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Users size={24} color="#6366f1" /> Cast & Crew
          </h3>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {movie.actors.map((actor, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#0f172a', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#334155', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                  {actor.charAt(0)}
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{actor}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default MovieDetails;

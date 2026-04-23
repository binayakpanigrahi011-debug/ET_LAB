import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = ({ movies }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.min(movies.length, 5));
    }, 5000);
    return () => clearInterval(timer);
  }, [movies]);

  if (movies.length === 0) return null;

  const topMovies = movies.slice(0, 5); // Show top 5 in carousel

  const nextSlide = () => setCurrent((prev) => (prev + 1) % topMovies.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + topMovies.length) % topMovies.length);

  return (
    <div className="carousel-container animate-fade-in" style={{ backgroundColor: '#0f172a' }}>
      {topMovies.map((movie, idx) => (
        <div 
          key={movie._id} 
          className={`carousel-slide ${idx === current ? 'active' : ''}`}
          style={{ 
            backgroundImage: `url(${movie.poster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            opacity: idx === current ? 1 : 0,
            visibility: idx === current ? 'visible' : 'hidden',
          }}
        >
          {/* Dark gradient overlay for readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,23,42,1) 0%, rgba(15,23,42,0.8) 40%, rgba(15,23,42,0) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0) 30%)' }} />

          {/* Text Content */}
          <div className="carousel-content" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5rem', maxWidth: '800px', zIndex: 10 }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
              {movie.title}
            </h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ padding: '0.4rem 1rem', background: 'rgba(51, 65, 85, 0.8)', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold' }}>{movie.genre}</span>
              <span style={{ padding: '0.4rem 1rem', background: 'rgba(51, 65, 85, 0.8)', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold' }}>{movie.duration}</span>
            </div>
            <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: '#cbd5e1', lineHeight: '1.6', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              {movie.description?.substring(0, 250)}...
            </p>
            <div>
              <Link to={`/movie/${movie._id}`} className="btn btn-accent" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
                Book Tickets Now
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <button 
        onClick={prevSlide}
        style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '1rem', cursor: 'pointer', zIndex: 20 }}
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={nextSlide}
        style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '1rem', cursor: 'pointer', zIndex: 20 }}
      >
        <ChevronRight size={32} />
      </button>

      <div className="carousel-indicators" style={{ right: 'auto', left: '5rem', bottom: '2rem' }}>
        {topMovies.map((_, idx) => (
          <div 
            key={idx} 
            className={`indicator ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
            style={{ 
               width: idx === current ? '30px' : '10px', 
               height: '10px',
               borderRadius: '5px'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('/movies');
        setMovies(res.data);
      } catch (error) {
        console.error('Error fetching movies', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading movies...</div>;

  return (
    <div>
      <HeroCarousel movies={movies} />

      <div className="container animate-fade-in" style={{ marginTop: '4rem', padding: '0 1rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          Recommended Movies
        </h2>
        
        {/* Changed grid layout to strictly enforce 4 items per row on desktop */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '2rem' 
        }}>
          {movies.map((movie) => (
            <Link to={`/movie/${movie._id}`} key={movie._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', height: '350px', background: '#000', display: 'flex', justifyContent: 'center' }}>
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/250x350?text=No+Poster' }}
                />
              </div>
              <div style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#1e293b' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {movie.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{movie.genre}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{movie.duration}</p>
                </div>
                <div className="btn btn-outline" style={{ width: '100%', textAlign: 'center', marginTop: '1rem' }}>View Details</div>
              </div>
            </Link>
          ))}
        </div>
        {movies.length === 0 && <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>No movies currently showing.</p>}
      </div>
    </div>
  );
};

export default Home;

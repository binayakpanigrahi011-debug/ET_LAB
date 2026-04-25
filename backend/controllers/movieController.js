const Movie = require('../models/Movie');

const getallMovies=async (req, res) => {
    try {
      const movies = await Movie.find({});
      res.json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  }

const getSingleMovie=async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  }

const createMovie = async (req, res) => {
    try {
      const { title, duration, genre, showTimings } = req.body;
      
      let posterUrl = '';
      if (req.file && req.file.path) {
        posterUrl = req.file.path;
      } else {
        return res.status(400).json({ message: 'Poster image is required' });
      }

      // If showTimings is sent as a comma-separated string from FormData, parse it
      let parsedTimings = showTimings;
      if (typeof showTimings === 'string') {
        parsedTimings = showTimings.split(',').map(t => t.trim());
      }
      
      const movie = new Movie({
        title,
        poster: posterUrl,
        duration,
        genre,
        showTimings: parsedTimings
      });
  
      const createdMovie = await movie.save();
      res.status(201).json(createdMovie);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }

const  deleteMovie=async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
  
      if (movie) {
        await Movie.deleteOne({ _id: movie._id });
        res.json({ message: 'Movie removed' });
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  }
module.exports={
    getallMovies,
    getSingleMovie,
    createMovie,
    deleteMovie
}
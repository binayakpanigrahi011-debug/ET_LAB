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

const createMovie=async (req, res) => {
    try {
      const { title, poster, duration, genre, showTimings } = req.body;
      
      const movie = new Movie({
        title,
        poster,
        duration,
        genre,
        showTimings
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
const express = require('express');
const router = express.Router();
const movieController=require('../controllers/movieController')
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/movies
// @desc    Fetch all movies
router.get('/',movieController.getallMovies);

// @route   GET /api/movies/:id
// @desc    Fetch single movie
router.get('/:id',movieController.getSingleMovie);

// @route   POST /api/movies
// @desc    Create a movie
// @access  Private/Admin
router.post('/', protect, admin,movieController.createMovie);

// @route   DELETE /api/movies/:id
// @desc    Delete a movie
// @access  Private/Admin
router.delete('/:id', protect, admin, movieController.deleteMovie);

module.exports = router;

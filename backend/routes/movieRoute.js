const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.get('/', movieController.getallMovies);

router.get('/:id', movieController.getSingleMovie);

router.post('/', protect, admin, upload.single('poster'), movieController.createMovie);

router.delete('/:id', protect, admin, movieController.deleteMovie);

module.exports = router;

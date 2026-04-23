const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   POST /api/bookings
// @desc    Create new booking
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { movie, showTiming, seats, totalCost } = req.body;

    if (seats && seats.length === 0) {
      return res.status(400).json({ message: 'No seats selected' });
    } else {
      const booking = new Booking({
        user: req.user.id,
        movie,
        showTiming,
        seats,
        totalCost,
      });

      const createdBooking = await booking.save();
      res.status(201).json(createdBooking);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/bookings/mybookings
// @desc    Get logged in user bookings
// @access  Private
router.get('/mybookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('movie', 'title poster');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate('user', 'id name').populate('movie', 'id title');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware');
const bookingController=require('../controllers/bookingController')
router.post('/', protect,bookingController.createBooking);

// @route   GET /api/bookings/mybookings
// @desc    Get logged in user bookings
// @access  Private
router.get('/mybookings', protect,bookingController.getmyBookings);

// @route   GET /api/bookings
// @desc    Get all bookings
// @access  Private/Admin
router.get('/', protect, admin,bookingController.getAllbooking);

module.exports = router;

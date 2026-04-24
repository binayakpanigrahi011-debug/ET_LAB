const Booking = require('../models/Booking');

const createBooking=async (req, res) => {
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
  }

const getmyBookings=async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('movie', 'title poster');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

const getAllbooking=async (req, res) => {
    try {
      const bookings = await Booking.find({}).populate('user', 'id name').populate('movie', 'id title');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  }
module.exports={
    createBooking,
    getmyBookings,
    getAllbooking
}
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  showTiming: { type: String, required: true },
  seats: [{ type: String, required: true }],
  totalCost: { type: Number, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);

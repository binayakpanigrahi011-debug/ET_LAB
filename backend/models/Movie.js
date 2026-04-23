const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  duration: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  actors: [{ type: String }],
  showTimings: [{ type: String, required: true }] // e.g. ["10:00 AM", "02:00 PM"]
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);

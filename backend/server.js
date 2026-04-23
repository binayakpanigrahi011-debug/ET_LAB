const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Import routes
const authRoutes = require('./routes/authRoute');
const movieRoutes = require('./routes/movieRoute');
const bookingRoutes = require('./routes/bookingRoute');

// Import Movie model for seeding
const Movie = require('./models/Movie');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main route
app.get('/', (req, res) => {
  res.send('QuickShow API is running...');
});

// App routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);

const seedMovies = async () => {
  const count = await Movie.countDocuments();
  if (count <= 12) {
    await Movie.deleteMany({});
    const movies = [
      {
        title: "Inception",
        poster: "/posters/inception.jpg",
        duration: "2h 28m",
        genre: "Sci-Fi, Action",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
        showTimings: ["10:00 AM", "01:15 PM", "06:30 PM", "10:00 PM"]
      },
      {
        title: "Avengers: Endgame",
        poster: "/posters/avengers_endgame.jpg",
        duration: "3h 2m",
        genre: "Action, Adventure",
        description: "After the devastating events of Infinity War, the remaining Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        actors: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
        showTimings: ["09:00 AM", "02:00 PM", "08:00 PM"]
      },
      {
        title: "The Dark Knight",
        poster: "/posters/the_dark_knight.jpg",
        duration: "2h 32m",
        genre: "Action, Crime",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        showTimings: ["11:30 AM", "04:45 PM", "09:15 PM"]
      },
      {
        title: "Interstellar",
        poster: "/posters/interstellar.jpg",
        duration: "2h 49m",
        genre: "Sci-Fi, Drama",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        showTimings: ["10:30 AM", "03:30 PM", "08:45 PM"]
      },
      {
        title: "Jawan",
        poster: "/posters/jawan.jpg",
        duration: "2h 49m",
        genre: "Action, Thriller",
        description: "A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.",
        actors: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi"],
        showTimings: ["09:15 AM", "01:00 PM", "05:15 PM", "10:30 PM"]
      }
    ];
    await Movie.insertMany(movies);
    console.log('Seeded initial expanded movies database!');
  }
};

// Database Connection
const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // If no URI provided, fall back to memory server to ensure it always runs locally for demo
    if (!mongoUri) {
      console.log('No MONGO_URI found, starting local in-memory MongoDB...');
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }

    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB: ${mongoUri.includes('127.0.0.1') ? 'Local Mongo' : 'Memory/Atlas'}`);
    
    // Seed the database with initial movies if empty
    await seedMovies();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

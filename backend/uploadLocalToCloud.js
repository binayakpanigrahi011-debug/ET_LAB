require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const localPostersDir = path.join(__dirname, '../frontend/public/posters');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');

  const movies = await Movie.find();

  for (const movie of movies) {
    // Attempt to match the file name logic. 'Inception' -> 'inception.jpg'
    const fileName = `${movie.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.jpg`;
    // We also know from downloadImage.js that titles were specific, like 'avengers_endgame'.
    // Let's just find the file that might match.
    
    // Check original title first (for inception, jawan, interstellar)
    let possibleFiles = [
      `${movie.title.toLowerCase()}.jpg`,
      `${movie.title.toLowerCase().replace(/ /g, '_')}.jpg`,
      `${movie.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.jpg`,
      movie.poster.split('/').pop() // Extract from current DB URL like /posters/inception.jpg
    ];

    let fileToUpload = null;
    for (const file of possibleFiles) {
      const fullPath = path.join(localPostersDir, file);
      if (fs.existsSync(fullPath)) {
        fileToUpload = fullPath;
        break;
      }
    }

    if (fileToUpload) {
      console.log(`Uploading ${fileToUpload} to Cloudinary...`);
      try {
        const result = await cloudinary.uploader.upload(fileToUpload, {
          folder: 'quickshow_posters',
          // Optimize resolution/quality on upload
          quality: 'auto:best',
          fetch_format: 'auto'
        });
        
        movie.poster = result.secure_url;
        await movie.save();
        console.log(`Updated ${movie.title} with Cloudinary URL: ${result.secure_url}`);
      } catch (err) {
        console.error(`Failed to upload ${movie.title}`, err);
      }
    } else {
      console.log(`No local image found for ${movie.title}`);
    }
  }

  console.log('Done uploading and updating DB.');
  process.exit(0);
}

run();

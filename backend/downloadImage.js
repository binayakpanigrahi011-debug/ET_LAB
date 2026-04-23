const fs = require('fs');
const https = require('https');
const path = require('path');

const movies = [
  { title: "inception", url: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
  { title: "avengers_endgame", url: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg" },
  { title: "the_dark_knight", url: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
  { title: "interstellar", url: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg" },
  { title: "jawan", url: "https://m.media-amazon.com/images/M/MV5BMGExNGI1NDktOWI2Mi00NDM3LWIxMmQtNTQxYTgzMzI0MTA1XkEyXkFqcGc@._V1_SX300.jpg" }
];

const destDir = path.join(__dirname, '../frontend/public/posters');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete the file async. (But we don't check the result)
      reject(err);
    });
  });
}

async function run() {
  for (const m of movies) {
    const file = path.join(destDir, `${m.title}.jpg`);
    console.log(`Downloading ${m.title}...`);
    try {
      await downloadFile(m.url, file);
      console.log(`Saved ${file}`);
    } catch (e) {
      console.error(`Error downloading ${m.title}:`, e);
    }
  }
}

run();

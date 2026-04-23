const https = require('https');

function getPoster(title) {
  return new Promise((resolve) => {
    https.get(`https://www.omdbapi.com/?apikey=thewdb&t=${encodeURIComponent(title)}`, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.Poster);
        } catch (e) {
          resolve(null);
        }
      });
    });
  });
}

async function run() {
  const titles = [
    "animal", "interstellar", "jawan", "kgf chapter 2", "rrr", 
    "spider man no way home", "baahubali 2 the conclusion"
  ];
  for (const t of titles) {
    const poster = await getPoster(t);
    console.log(`${t}: ${poster}`);
  }
}
run();

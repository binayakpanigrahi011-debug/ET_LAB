const https = require('https');
https.get('https://www.omdbapi.com/?apikey=thewdb&t=interstellar', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => console.log(data));
});

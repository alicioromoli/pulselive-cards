const express = require('express');
const Player = require('../src/app/models/playersModel');
const app = express();
const basePath = __dirname;
const PORT = process.env.PORT || 5000;

// access home page
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/app/views/pages/index.html`);
});
// get players data
app.get('/players', async (req, res) => {
  const players = await Player.findAll();
  res.json(players);
});
//public folder available globally
app.use(express.static(`public`));

app.listen(PORT, () => {
  console.log(`running on port: ${PORT}`);
});

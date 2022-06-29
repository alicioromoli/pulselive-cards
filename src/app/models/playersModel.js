const players = require('../../data/player-stats.json');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(players);
  });
}

module.exports = {
  findAll,
};

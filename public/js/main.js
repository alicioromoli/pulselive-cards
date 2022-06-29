'use strict';
const STATS = {
  APPERANCES: 'appearances',
  GOALS: 'goals',
  ASSISTIS: 'goal_assist',
  MINS_PLAYED: 'mins_played',
  FWD_PASS: 'fwd_pass',
  BACKWARD_PASS: 'backward_pass',
};
const POSITION = {
  M: 'Midfielder',
  F: 'Striker',
  D: 'Defender',
};
let playerData = '';
fetchData('/players', (data) => {
  playerData = data;
  const playerSelector = document.getElementById('player-select');
  let playerIds = [];
  playerData.forEach((data) => {
    const {
      player: { id },
    } = data;
    playerIds.push(id.toString());
  });

  dropDownCreate();
  createImgElements();
  onChangePlayer(playerData[0]);

  playerSelector.addEventListener('change', function (event) {
    playerIds.forEach((id, index) => {
      if (event.target.value === id) {
        onChangePlayer(playerData[index]);
      }
    });
  });

  function dropDownCreate() {
    playerData.forEach((data) => {
      const {
        player: {
          name: { first: firstName, last: lastName },
          id,
        },
      } = data;
      const name = `${firstName} ${lastName}`;
      const element = document.createElement('option');
      element.textContent = name;
      element.value = id;
      playerSelector.appendChild(element);
    });
  }

  function createImgElements() {
    playerData.forEach((data) => {
      const {
        player: {
          name: { first: firstName, last: lastName },
          id,
        },
      } = data;
      const media = document.querySelector('.card__media');
      const element = document.createElement('img');
      element.classList.add('card__img');
      element.src = `assets/p${id}.png`;
      element.alt = `profile picture of ${firstName} ${lastName}`;
      element.setAttribute('id', `${id}`);
      media.appendChild(element);
    });
  }

  function onChangePlayer(data) {
    const {
      player: {
        name: { first: firstName, last: lastName },
        id,
        info,
        currentTeam,
      },
      stats,
    } = data;
    //get elements
    const media = document.querySelector('.card__media');
    const profileImg = document.getElementById(id);
    const playerName = document.querySelector('.card__title');
    const playerPosition = document.querySelector('.card__position');
    const teamFlag = document.querySelector('.card__team-flag');
    const apperances = document.getElementById('appearances');
    const goals = document.getElementById('goals');
    const assists = document.getElementById('assists');
    const goalsPerMatch = document.getElementById('goals-per-match');
    const passesPerMinute = document.getElementById('passes-per-minute');
    // get stats value
    let goalsValue = stats.filter((stat) => stat.name === STATS.GOALS)[0].value;
    let minPlayedValue = stats.filter(
      (stat) => stat.name === STATS.MINS_PLAYED
    )[0].value;
    let fwdPassValue = stats.filter((stat) => stat.name === STATS.FWD_PASS)[0]
      .value;
    let backwardPassValue = stats.filter(
      (stat) => stat.name === STATS.BACKWARD_PASS
    )[0].value;
    let appearancesValue = stats.filter(
      (stat) => stat.name === STATS.APPERANCES
    )[0].value;
    let assistisValue = stats.filter((stat) => stat.name === STATS.ASSISTIS);

    if (assistisValue.length > 0) {
      assistisValue = assistisValue[0].value;
    } else {
      assistisValue = '0';
    }
    //calculate the matches based on minutes played
    const matchesPlayed = roundTwo(minPlayedValue / 90);
    const goalsPerMatchValue = roundTwo(goalsValue / matchesPlayed);
    const passedPerMinuteValue = roundTwo(
      (fwdPassValue + backwardPassValue) / minPlayedValue
    );
    //populate stats value
    goalsPerMatch.textContent = goalsPerMatchValue;
    passesPerMinute.textContent = passedPerMinuteValue;
    goals.textContent = goalsValue;
    apperances.textContent = appearancesValue;
    assists.textContent = assistisValue;

    const children = media.getElementsByTagName('img');

    for (var i = 0; i < children.length; i++) {
      children[i].style.visibility = 'hidden';
    }

    profileImg.style.visibility = 'visible';

    playerName.textContent = `${firstName} ${lastName}`;

    playerPosition.textContent = getPosition(info.position);

    teamFlag.style.backgroundPosition = getPositionBadge(currentTeam.shortName);
  }
});

export async function fetchData(url, callback) {
  try {
    const response = await fetch(url);
    let data = await response.json();
    return callback(data.players);
  } catch (error) {
    console.log('Something went wrong.', error);
  }
}

function roundTwo(num) {
  return num.toFixed(2);
}

function getPosition(position) {
  const positionPlace = Object.keys(POSITION).filter((key) => key === position);
  return POSITION[positionPlace];
}

function getPositionBadge(team) {
  if (team === 'Spurs') return '-500px -1000px';
  if (team === 'Man City') return '-800px -700px';
  if (team === 'Man Utd') return '-600px -800px';
  if (team === 'Arsenal') return '-100px -100px';
  if (team === 'Leicester') return '0px 0px';
}

export function generateText(nameF, age) {
  return `${nameF} (${age}, years old)`;
}

'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const PORT = process.env.PORT || 3001;
const SERVER_URL = `http://localhost:3001/hide`;

const playerSocket = io(SERVER_URL);
/*
payload = {
  name:
  role:
  currentSpot:
  movingTo:
  otherSpots:
}
*/

playerSocket.on('start', (hidingSpots) => {
  //generate a payload
  let names = ['Laurel', 'Jon', 'Daniel'];
  let random2 = Math.floor(Math.random() * (names.length - 1));
  let payload = {
    name: names[random2],
    role: 'hider',
    currentSpot: null,
    movingTo: "8",
    otherSpots: hidingSpots,
  }
  //run hide with payload
  playerSocket.emit('move', payload);
  //set delay for hiders to hide.
});

playerSocket.on('traveling', (payload) => {
  console.log('You are moving.')
  setTimeout(() => {
    playerSocket.emit('arrived', payload);
  }, 2000);
  //set delay
  //emit arrived
});

playerSocket.on('playerMovement', (message) => {
  console.log("You hear the bushes rustle as someone is moving...");
  //log message that someone is moving
});

playerSocket.on('arrived', (payload) => {
  if (payload.role === 'seeker') {
    console.log(`You are plotting your next move in room ${payload.currentSpot}.`)
  } else {
    console.log(`You are now hiding in room ${payload.currentSpot}.`)
  }
  let otherSpots = payload.otherSpots;
  /*console.log('Here are the available spots: ');
  otherSpots.forEach(spot => {
    console.log('Room ', spot);
  });*/
  //log current location
  //log all available hidingSpots player can move to.
  //run hide function.
});

playerSocket.on('caught', (payload) => {
  console.log('You were caught by the seeker!');
  
  //log that player was caught
  //emit 'caught'
});

playerSocket.on('end', (message) => {
  //log that game is over and winner from message.
});

playerSocket.emit('start', {});

function hide(payload) {
  //set REPL listener for input
  //check if input matches command
  //emit move
}

function start() {
  //set REPL listener for input
  //check if input matches start
  //emit start.
}
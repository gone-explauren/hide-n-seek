'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const PORT = process.env.PORT || 3001;
const SERVER_URL = `http://localhost:3001/hide`;

const playerSocket = io(SERVER_URL);
console.log(SERVER_URL);
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
  let payload = {
    name: 'Laurel',
    role: 'hider',
    currentSpot: null,
    movingTo: 8,
    otherSpots: hidingSpots,
  }
  //run hide with payload
  playerSocket.emit('move', payload);
  //set delay for hiders to hide.
});

playerSocket.on('traveling', (payload) => {
  //set delay
  //emit arrived
});

playerSocket.on('playerMovement', (message) => {
  console.log("You hear the bushes rustle as someone is moving...");
  //log message that someone is moving
});

playerSocket.on('arrived', (payload) => {
  //log current location
  //log all available hidingSpots player can move to.
  //run hide function.
});

playerSocket.on('caught', (payload) => {
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
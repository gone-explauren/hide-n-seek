'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const PORT = process.env.PORT || 3001;
const SERVER_URL = `${process.env.SERVER_URL}:${PORT}/hide`;

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
  //run hide with payload
  //set delay for hiders to hide.
});

playerSocket.on('traveling', (payload) => {
  //set delay
  //emit arrived
});

playerSocket.on('noise', (message) => {
  //log message that someone is moving
});

playerSocket,on('arrived', (payload) => {
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

function hide() {
  //set REPL listener for input
  //check if input matches command
    //emit move
}

function start() {
  //set REPL listener for input
  //check if input matches start
    //emit start.
}
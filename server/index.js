'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const MessageQueue = require('./lib/queue');
const PORT = process.env.PORT || 3001;
const io = Server(PORT);

const hidingSpots = new MessageQueue();
const movingTo = new MessageQueue();
const hide = io.of('/hide');

const numRooms = 0;

/*
payload = {
  name:
  role:
  currentSpot:
  movingTo:
  otherSpots:
}
*/

/* movingTo = {
  {
    1: {
      name: payload,
      name: payload,
      name: payload,
    },
    
    2: {},
  },
}
*/

/* hidingSpots = {
  {
    1: {
      name: payload,
      name: payload,
      name: payload,
    },
    
    2: {},
  },
}
*/

//setup hidingSpots/movingTo queue by numRooms.

hide.on('connection', (socket) => {
  socket.on('start', (payload) => {
    //set startTime to Date.now();
    //emit start with all hidingSpots.
  });

  socket.on('move', (payload) => {
    //add payload to movingTo queue
    //broadcast 'noise' to all other sockets.
    //if role === Hider
      //if movingTo has Seeker
        //emit 'caught'
      //else
        //emit 'traveling'
  });

  socket.on('arrived', (payload) => {
    //move payload from movingTo queue to hidingSpot queue.
    //if role === Seeker
      //if movingTo has more than 1 value
        //for all hiders, emit 'caught'
      //
    //update payload currentSpot and otherSpots, null out movingTo
    //emit 'arrived'
  });

  socket.on('caught', (payload) => {
    //remove player from hidingSpot queue.
    //broadcast to all other sockets that player has been caught.
    //reduce playerCount by 1.
    //if playerCount is 1
      //compare Date.now() to startTime to get time elapsed.
      //message saying how long game lasted.
      //emit 'end' to entire server with message.
  });

  socket.on('end', (payload) => {
    //log that game has finished.
  });
});


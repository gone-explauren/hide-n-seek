'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const MessageQueue = require('./lib/queue');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);
const util = require('util');

const hidingSpots = new MessageQueue();
const inTransit = new MessageQueue();
const caught = new MessageQueue();
const hide = io.of('/hide');

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

for (let i = 1; i <= 10; i++) {
  let room = new MessageQueue()
  let room2 = new MessageQueue()
  hidingSpots.store(i, room);
  inTransit.store(i, room2);
}
// console.log(util.inspect(hidingSpots, false, null));

//setup hidingSpots/movingTo queue by numRooms.

hide.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('start', (payload) => {
    // console.log("Hello world!")
    let rooms = Object.keys(hidingSpots.data);
    // console.log(rooms);
    //set startTime to Date.now();
    //emit start with all hidingSpots.
    hide.emit('start', rooms);
  });

  socket.on('move', (payload) => {
    //add payload to movingTo queue
    let room = inTransit.read(payload.movingTo);
    room.store(`${payload.role} ${socket.id}`, payload);
    //broadcast 'playerMovements' to all other sockets.
    socket.broadcast.emit('playerMovement', payload)
    //if role === Hider
    if (payload.role === 'hider') {
      let route = inTransit.read(payload.movingTo);
      let seeker = route['seeker'];
      if (seeker) {
        socket.emit('caught', payload);
      } else {
        socket.emit('traveling', payload);
      }
    }
  });

  socket.on('arrived', (payload) => {
    let route = inTransit.read(payload.movingTo);
    let key = `${payload.role} ${socket.id}`;
    let movedPlayer = route.remove(key);

    payload.currentSpot = payload.movingTo;
    payload.movingTo = null;

    if (payload.role === 'seeker') {
      let check = hidingSpots.read(payload.currentSpot);

      let players = Object.keys(check.data);

      if (players.length > 0) {
        players.forEach(player => {
          let socketId = player.split(' ')[1];
          hide.to(socketId).emit('caught', check.data[player]);
        })
      }
    }

    let room = hidingSpots.read(payload.currentSpot);
    room.store(key, movedPlayer);

    hidingSpots.store(payload.currentSpot, room);

    let rooms = Object.keys(hidingSpots.data);
    console.log('index of ', rooms.indexOf(payload.currentSpot));
    payload.otherSpots.splice(rooms.indexOf(payload.currentSpot), 1);
    console.log('ALL THE OTHER ROOMS ', payload.otherSpots);
    socket.emit('arrived', payload);
    // if (payload.role === 'seeker') {
    //   if (seeker) {
    //     socket.emit('caught', payload);
    //   } else {
    //     socket.emit('traveling', payload);
    //   }
    // }

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


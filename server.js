'use strict';

const io = require('socket.io')(3002);

io.on('connection', socket => {
  console.log(`Connection from: ${socket.id}`);

  socket.on('moisture-data', payload => {
    console.log('moisture-data');

    io.emit('moisture-data', payload);
  });

  socket.on('req-data', payload => {
    console.log('req-data');

    io.emit('req-data', payload);
  });
});

let helloWorld = () => {
  console.log('Hello World');
};

helloWorld();

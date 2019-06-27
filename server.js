'use strict';

const io = require('socket.io')(3030);

io.on('connection', socket => {
  console.log(`Connection from: ${socket.id}`);

  socket.on('moisture-data', payload => {
    io.emit('moisture-data', payload);
  });

  socket.on('req-data', payload => {
    io.emit('req-data', payload);
  });

  socket.on('save-status', payload => {
    io.emit('save-status', payload);
  });
});

// let helloWorld = () => {
//   console.log('Hello World');
// };

// helloWorld();

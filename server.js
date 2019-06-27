'use strict';

const io = require('socket.io')(3030);

io.on('connection', socket => {
  console.log(`Connection from: ${socket.id}`);

  socket.on('moisture-data', payload => {
    console.log('PAYLOAD: ', payload);
    let dataObj = {
      timestamp: new Date(),
      moistureCategory: payload.result,
      moistureNumber: payload.m,
    };

    io.emit('moisture-data', dataObj);
  });

  socket.on('req-data', payload => {
    io.emit('req-data', payload);
  });

  socket.on('save-status', payload => {
    io.emit('save-status', payload);
  });
});

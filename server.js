'use strict';

var app = require('express')();
var server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT);

io.on('connection', socket => {
  console.log(`Connection from: ${socket.id}`);

  socket.on('moisture-data', payload => {
    console.log(typeof payload);
    let newPayload = JSON.parse(payload);
    console.log('PAYLOAD: ', JSON.parse(payload));
    console.log(newPayload[0]);
    console.log(newPayload[1]);
    let dataObj = {
      timestamp: new Date(),
      moistureCategory: newPayload[0],
      moistureNumber: Number(newPayload[1]),
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

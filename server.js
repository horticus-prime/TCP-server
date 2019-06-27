'use strict';

var app = require('express')();
var server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT);

io.on('connection', socket => {
  console.log(`Connection from: ${socket.id}`);

  socket.on('moisture-data', payload => {
    let newPayload = JSON.stringify(payload);
    console.log('PAYLOAD: ', JSON.stringify(payload));
    console.log(newPayload.category);
    console.log(newPayload.val);
    let dataObj = {
      timestamp: new Date(),
      moistureCategory: newPayload.category,
      moistureNumber: Number(newPayload.val),
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

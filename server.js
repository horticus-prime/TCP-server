'use strict';

let cron = require('node-cron');

// var app = require('express')();
// var server = require('http').Server(app);
// const io = require('socket.io')(server);
const io = require('socket.io')(3006);

// server.listen(process.env.PORT);

let arr = [];

io.on('connection', socket => {
  console.log(`Connection from: ${socket.id}`);

  // emit data
  socket.on('moisture-data', payload => {
    let newPayload = JSON.parse(payload);
    arr.push(newPayload);
    
    let dataObj = {
      timestamp: new Date(),
      moistureCategory: newPayload.category,
      moistureNumber: Number(newPayload.val),
    };

    io.emit('moisture-data', dataObj);
  });

  // database data
  cron.schedule('*/1 * * * *', function() {
    console.log('array', arr);
    io.emit('database-data', arr[arr.length-1]);
    arr = [];
  });

  socket.on('req-data', payload => {
    io.emit('req-data', payload);
  });

  socket.on('save-status', payload => {
    io.emit('save-status', payload);
  });
});

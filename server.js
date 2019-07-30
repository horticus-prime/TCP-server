'use strict';

let cron = require('node-cron');

// DEPLOY STUFF:
// var app = require('express')();
// var server = require('http').Server(app);
// const io = require('socket.io')(server);
// server.listen(process.env.PORT);

const io = require('socket.io')(3006);

let arr = [];

io.on('connection', socket => {
  console.log(`Connection from: ${socket.id}`);

  // emit data
  socket.on('moisture-data', payload => {
    let newPayload = JSON.parse(payload);
    arr.push(newPayload);

    io.emit('moisture-data', payload);
  });

  // database data
  // cron.schedule('*/1 * * * *', function() {
  //   console.log('array', arr);
  //   io.emit('database-data', arr[arr.length-1]);
  //   arr = [];
  // });

  socket.on('req-data', payload => {
    io.emit('req-data', payload);
  });

  socket.on('save-status', payload => {
    io.emit('save-status', payload);
  });
});

const express = require('express');
const app = express();
const socket = require('socket.io');

const server = app.listen(8000, () => {
    console.log('server is running on port 8000');
});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
    console.log('connection made',socket.id);


    socket.on('recieve', (data) => {   
        socket.broadcast.emit('recieve', data)
    })


    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
});
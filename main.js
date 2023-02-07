require('dotenv').config()
const express = require('express');
const app = express();
const socket = require('socket.io');
const port = process.env.PORT || 5001

const server = app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

app.use(express.static('public'));
app.use('*', express.static('public'));

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
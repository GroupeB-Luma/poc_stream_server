var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(82);
// WARNING: app.listen(80) will NOT work here!


actualRooms = []

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    let room = ""
    console.log("connected")
    socket.emit('log connexion', { response: 'connected' });
    socket.on('my other event', function (data) {
        //console.log(data);
    });
    socket.on('stream', function (data) {
        // console.log(data);
        socket.broadcast.to(room).emit('streamResponse', data);
    })

    socket.on('join', function (data) {
        if (room != "") {
            socket.leave(room)
        }
        room = data.roomName
        //console.log(data)
        socket.join(data.roomName)
    })

    socket.on('leave', function (data) {
        room = data.roomName
        //console.log(data)
        socket.leave(data.roomName)
    })
});

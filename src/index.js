import express from 'express';
import socket from 'socket.io';
import config from './config';


// App setup
let app = express();

// app.get('/', (req, res) => {
//   res.status(200).send("API is UP!!!!");
// })

// Static files
app.use(express.static('public'));

//Start Server
let server = app.listen(process.env.PORT || config.port, () => {
console.log();
console.log(' ,-----,--.  ,--.,------. ,--. ,---.,--------.,-----.');
console.log("| .--./|  '--'  ||  .--. '|  |'   .-'--.  .--'  .-.  ' ");
console.log("| |  | |  .--.  ||  '--'.'|  |`.  `-.  |  |  |  | |  | ");
console.log("| '--'\\|  |  |  ||  | \\  \\|  |.-'    | |  |  '  '-'  ' ");
console.log(" -----'`--'  `--'`--' `--'`--'`-----'  `--'   `-----'  ");
console.log();
console.log("Server Listening on port " + config.port );
});

app.get('/test', (req, res) => {
  res.status(200).send("API is UP!!!!!!");
})

//Socket Setup
let io = socket(server);

io.on('connection', (socket) => {

    let x = 0;
    let y = 5;

    console.log('Made Socket Connection', socket.id);

    // Handle chat message event
    socket.on('chat', function(data){
        //console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle user typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

    socket.on('join', function(data){
      socket.emit('join', {x,y});
    });
    var interval = setInterval(myTimer, 1000 * 5);

    function myTimer() {
      x++;
      y = Math.floor(Math.random() * (20 - 1) + 1)
      socket.emit('step', {x,y});
    }

    socket.on('disconnect', function() {
           clearInterval(interval);
       });
});

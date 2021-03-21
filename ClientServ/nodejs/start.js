const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http').Server(app);
const soap = require('soap');
const io = socketio(http);
const port = 3000;

const url = 'https://tparchitecture.azurewebsites.net/?wsdl';

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res)=> {
    res.render('index');
});

io.on('connection', socket => {
    console.log("New user connected");
    socket.on('deliveryCostRequest',(array) => {
      soap.createClient(url, function(err, client) {
        client.livraison(array, function(err, result) {
          socket.emit('deliveryCostResponse',{deliveryCost:result});
        });
      });
    })
});

http.listen(port,() => {
  console.log('listening on 3000');
});

var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var dgram = require("dgram");
var udp_server = dgram.createSocket("udp4");

function getIPAdress(){
  var interfaces = require("os").networkInterfaces();
  for(var devName in interfaces){
    var iface = interfaces[devName];
    for(var i=0;i<iface.length;i++){
      var alias = iface[i];
      if(alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal){
        return alias.address;
      }
    }
  }
}

udp_server.bind(7000);

console.log(getIPAdress());
udp_server.on('listening', function(){
  udp_server.setBroadcast(true)
  udp_server.setMulticastTTL(128);
});

app
.use(express.static('./front'));

io.on('connection', function (socket) {
  socket.on('location', function (data) {
    console.log(data);
    data = JSON.stringify(data);
    udp_server.send(data, 0, data.length, 7001, "192.168.1.255");
  });
});

io.listen(app.listen(3000));

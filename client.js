//////////////////////////////////////////////////////////////////////////////
//// A simple client to receive one message from the server
//// Needed to validate the broadcast messaging system
//////////////////////////////////////////////////////////////////////////////

var dgram = require("dgram");
var broadcastAddress = "192.168.1.255";

var message = new Buffer("Some bytes");

var client = dgram.createSocket("udp4");
client.bind(7001);

client.on("listening", function () {
  client.setBroadcast(true);
});

client.on("message", function (msg, rinfo) {
  console.log("client got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
  client.close();
});

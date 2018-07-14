var socket = io();

socket.on("connect", function () {
  console.log("Connected To Server!");

});

socket.on("disconnect", function () {
  console.log("Connection Disconnected!")
});

socket.on("newMessage", function(message) {
  console.log("New Message. Details:",message);
});

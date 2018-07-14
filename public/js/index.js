var socket = io();

socket.on("connect", function () {
  console.log("Connected To Server!");

  socket.emit("createMessage", {
    from: "Danny@Amazing.com",
    text: "Oh WOW"
  });

  socket.emit("createEmail", {
    to: "Jenny@Amazing.com",
    text: "Hey This is connor."
  });
});

socket.on("disconnect", function () {
  console.log("Connection Disconnected!")
});

socket.on("newMessage", function(message) {
  console.log("New Message. Details:",message);
});

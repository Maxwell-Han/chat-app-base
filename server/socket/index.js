module.exports = io => {
  io.on("connection", socket => {
    console.log(socket.id, " has made a persistent connection to the server!");
    socket.on("ADD_MESSAGE", function(message) {
      console.log("message: " + message);
      socket.emit('ADD_MESSAGE', message)
    });

    socket.on("new-message", message => {
      socket.broadcast.emit("new-message", message);
    });

    socket.on("new-channel", channel => {
      socket.broadcast.emit("new-channel", channel);
    });
  });
};

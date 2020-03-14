
const onlineUsers = {}

module.exports = io => {
  io.on("connection", socket => {
    console.log(socket.id, " has made a persistent connection to the server!");
    console.log("online users are ", onlineUsers);

    socket.on("ADD_MESSAGE", message => {
      console.log("SERVER: socket got message: " + message);
      io.emit("ADD_MESSAGE", message);
    });

    socket.on("ADD_BUDDY_TO_ROOM", buddy => {
      console.log("socket on server: about to add buddy to room ", buddy);
      io.emit("ADD_BUDDY_TO_ROOM", buddy);
      // handle so that those that are added receive their room
      const userId = buddy._id;
      console.log("client socket is ", socket, socket.id);
      if(userId in onlineUsers) {
        io.to(onlineUsers[userId]).emit('GET_ROOMS', userId)
        console.log('emitting get rooms from server')
      }
    });

    socket.on("GET_USER", user => {
      console.log("server socket got user ", user);
      if (!(user._id in onlineUsers)) {
        onlineUsers[user._id] = socket.id;
      }
      console.log("socket online users show as ", onlineUsers);
    });

    socket.on('disconnect', () => {
      const onlineIds = Object.values(onlineUsers)
      console.log('online users are ', onlineUsers)
      const clientId = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id)
      console.log('found client id is', clientId)
      delete onlineUsers[clientId]
      console.log('deleted last user.  online users are ', onlineUsers)
    })

    socket.on("new-channel", channel => {
      socket.broadcast.emit("new-channel", channel);
    });
  });
};

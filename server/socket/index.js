module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });

    const codyChat = io.of('/Cody-Room')
    codyChat.on('connection', socket => {
      console.log('!!!Someone connected to Codys Chat Room!!!')
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}


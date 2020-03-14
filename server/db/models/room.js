const mongoose = require("mongoose");
const Message = require("./message");
const messageSchema = require('./message').messageSchema

const roomSchema = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    trim: true
  },
  messages: [messageSchema],
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  owners: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

roomSchema.statics.createRoomWithOwner = async function(roomName, userId) {
  const room = await this.create({roomName})
  room.owners.push(userId)
  room.users.push(userId)
  await room.save()
  return room
}

roomSchema.methods.addUser = async function(userId) {
  this.users.push(userId)
  await this.save()
  console.log('added user to room ', userId)
  return this
}

roomSchema.methods.addMessage = async function(message) {
  const newMessage = await Message.create(message)
  this.messages.push(newMessage)
  await this.save()
  return newMessage
}

module.exports = mongoose.model("Room", roomSchema);

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
  await room.save()
  return room
}

roomSchema.methods.addUser = async function(userId) {
  this.users.push(userId)
  await this.save()
  console.log('added user to room ', userId)
  return this
}

module.exports = mongoose.model("Room", roomSchema);

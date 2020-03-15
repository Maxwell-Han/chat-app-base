const mongoose = require("mongoose");
const Message = require("./message");
const User = require('./user')
const messageSchema = require('./message').messageSchema
const MeetingItem = require('./meetingItem')
const meetingItemSchema  = require('./meetingItem').meetingItemSchema

const roomSchema = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    trim: true
  },
  items: [meetingItemSchema],
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
  const user = await User.findById(userId)
  user.rooms.push(room._id)
  await user.save()
  return room
}

roomSchema.statics.getRoomsForSockets = async function() {
  const allRooms = await this.find()
  const roomIds = allRooms.map(r => r._id)
  return roomIds
}

roomSchema.methods.addUser = async function(userId) {
  this.users.push(userId)
  const user = await User.findById(userId)
  user.rooms.push(this._id)
  await user.save()
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

roomSchema.methods.addItem = async function(item) {
  const newItem = await MeetingItem.create(item)
  this.items.push(newItem)
  await this.save()
  return newItem
}

module.exports = mongoose.model("Room", roomSchema);

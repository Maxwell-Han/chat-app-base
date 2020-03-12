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
  }]
});

roomSchema.methods.addUser = async function(userId) {
  this.users.push(userId)
  await this.save()
  console.log('added user to room ', userId)
  return this
}

module.exports = mongoose.model("Room", roomSchema);

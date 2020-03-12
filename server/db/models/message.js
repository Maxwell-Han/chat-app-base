const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    },
  createdAt: { type: Date, default: Date.now },
  content: { type: String },
  isPinned: { type: Boolean, default: false }
});



module.exports = mongoose.model("Message", messageSchema);
module.exports.messageSchema = messageSchema

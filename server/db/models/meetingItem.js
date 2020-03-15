const mongoose = require("mongoose");

const meetingItemSchema = mongoose.Schema({
  roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    },
  name: { type: String },
  description: { type: String },
  status: { type: String, default: 'open', enum: ['open', 'closed'] },
  score: { type: Number, min: 1, max: 100},
  votes: { type: Array },
  rating: { type: Number, max: 5, min: 1 },
  inFocus: {type: Boolean, default: false}
});



module.exports = mongoose.model("MeetingItem", meetingItemSchema);
module.exports.meetingItemSchema = meetingItemSchema

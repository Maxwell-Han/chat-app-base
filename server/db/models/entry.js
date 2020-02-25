const mongoose = require("mongoose");
const User = require("./user");

const entry = mongoose.Schema({
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  createdAt: { type: Date, default: Date.now },
  name: { type: String, default: "Meal Entry" },
  carb: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  favorite: { type: Boolean, default: false }
});

entry.pre("remove", async function(next) {
  try {
    let user = await User.findById(this.user);
    user.log.remove(this.id);
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("Entry", entry);

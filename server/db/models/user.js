const mongoose = require("mongoose");
mongoose.set('debug', true)

const user = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  },
  name: String,
  goal: {
    weight: Number,
    bodyFat: Number
  },
  macros: {
    carbs: Number,
    fats: Number,
    protein: Number
  },
  profile: [
    {
      createdAt: {type: Date, default: Date.now },
      startingPoint: {type: Boolean, default: false },
      weight: Number,
      bodyFat: Number
    }
  ],
  log: [
    {
      type: mongoose.Schema.Types.ObjectId,
			ref: "Entry"
    }
  ],
  favorites : [
    {
      name: { type: String, default: 'Meal' },
      carb: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      favorite: {type: Boolean, default: false }
    }
  ]
})


module.exports = mongoose.model("User", user);

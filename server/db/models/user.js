const Bcrypt = require("bcryptjs");
const findOrCreate = require("mongoose-findorcreate");
const Mongoose = require("mongoose");
Mongoose.set("debug", true);

const User = Mongoose.Schema({
  name: String,
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
      createdAt: { type: Date, default: Date.now },
      startingPoint: { type: Boolean, default: false },
      weight: Number,
      bodyFat: Number
    }
  ],
  log: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Entry"
    }
  ],
  favorites: [
    {
      name: { type: String, default: "Meal" },
      carb: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      protein: { type: Number, default: 0 },
      favorite: { type: Boolean, default: false }
    }
  ]
});

User.plugin(findOrCreate);

// hook for signup logic
User.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await Bcrypt.hashSync(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});


module.exports = Mongoose.model("User", User);

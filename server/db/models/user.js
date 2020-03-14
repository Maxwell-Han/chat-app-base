const Message = require("./message");
const Bcrypt = require("bcryptjs");
const findOrCreate = require("mongoose-findorcreate");
const mongoose = require("mongoose");
mongoose.set("debug", true);

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  googleId: {
    type: String
  },
  zipCode: {
    type: Number
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ],
  buddies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    }
  ]
});

userSchema.plugin(findOrCreate);

// hook for signup logic
userSchema.pre("save", async function(next) {
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

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.statics.findByUserName = async function(username) {
  const user = await this.findOne({ userName: username });
  return user.toJSON();
};

userSchema.statics.findUsersByIds = async function(userIds) {
  const users = await Promise.all(
    userIds.map(async id => {
      const user = await this.findById(id);
      return user;
    })
  );
  return users;
};

userSchema.statics.correctPassword = async function(username, sentPw) {
  const user = await this.findOne({ userName: username });
  const checked = await Bcrypt.compare(sentPw, user.password);
  return checked;
};

userSchema.statics.getBuddies = async function(userId) {
  const user = await this.findById(userId)
  const buddies = await Promise.all(
    user.buddies.map(async id => {
      const person = await this.findById(id);
      return person;
    })
  );
  return buddies
};

module.exports = mongoose.model("User", userSchema);

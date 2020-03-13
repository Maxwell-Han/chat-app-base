const express = require("express");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const app = express();
const morgan = require("morgan");
const path = require("path");
const { db, User } = require("./db");
const secrets = require("../secrets");
const socketio = require("socket.io");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../public")));

  app.use(
    session({
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 7 * 24 * 60 * 60
      }),
      secret: process.env.SESSION_SECRET || secrets.sessionsSecret,
      resave: false,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // routers
  app.use("/api", require("./api"));
  app.use("/auth", require("./auth"));

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });

  app.use(function(err, req, res, next) {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

const startListening = () => {
  const port = process.env.PORT || 3000;
  const server = app.listen(port, function() {
    console.log("Starting up server from server/index.js");
    console.log(`Your server, listening on port ${port}`);
  });

  const io = socketio(server);
  require("./socket")(io);
};

async function bootApp() {
  await createApp()
  await startListening()
}

bootApp()

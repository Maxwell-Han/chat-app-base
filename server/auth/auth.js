const router = require("express").Router();
const { User } = require("../db");
const Bcrypt = require("bcryptjs");

router.use("/google", require("./google"));

router.get("/me", (req, res, next) => {
  res.json(req.user || {});
});

router.post("/login", async (req, res, next) => {
  try {
    const username = req.body.userName;
    const sentPw = req.body.password;
    const user = await User.findByUserName(username);
    console.log(user);
    if (!user) {
      console.log("No such user found:", username);
      res.status(401).send("Wrong username and/or password");
    } else if (!(await User.correctPassword(username, sentPw))) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong username and/or password");
    } else {
      console.log("Logged in successfully!");
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { userName, email, password, zipCode } = req.body;
    const userData = { userName, email, password, zipCode };
    const user = await User.create(userData);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    next(err);
    // handle Mongo E11000 duplicate key error collection
    if (err.code === 11000) {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.delete("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy(err => {
    if (err) return next(err);
    res.status(204).end();
  });
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;

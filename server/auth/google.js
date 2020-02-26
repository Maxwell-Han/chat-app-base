const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User } = require("../db/models");
const secrets = require("../../secrets");

router.get("/", passport.authenticate("google", { scope: "email" }));

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
);

const verificationCallback = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { doc: user } = await User.findOrCreate({
      googleId: profile.id
    });
    console.log("created user via mongoose and user is : ", user);
    done(null, user);
  } catch (err) {
    done(err);
  }
};

const strategy = new GoogleStrategy(
  {
    clientID: secrets.clientId,
    clientSecret: secrets.clientSecret,
    callbackURL: "/auth/google/callback"
  },
  verificationCallback
);

passport.use(strategy);

module.exports = router;

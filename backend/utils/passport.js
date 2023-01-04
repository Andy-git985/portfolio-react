const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL,
      scope: ['profile'],
    },
    // async (accessToken, refreshToken, profile, done) => {
    //   console.log(profile);
    //   console.log(profile.provider);
    //   console.log(profile.id);
    //   done(null, profile);
    // },
    async (accessToken, refreshToken, profile, done) => {
      const user = new User({
        providerId: profile.id,
        displayName: profile.displayName,
      });
      try {
        const pastUser = await User.findOne({ providerId: profile.id });

        if (pastUser) {
          done(null, pastUser);
        } else {
          await user.save();
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

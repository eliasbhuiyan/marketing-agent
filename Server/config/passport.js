const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userSchema = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {     
      try {
        let user = await userSchema.findOne({ email: profile.emails[0].value });
        if (!user) {
          // Create new user
          user = await userSchema.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName,
            avatar: profile.photos[0].value,
          });
        } else if (!user.googleId) {
          // If user exists but no Google ID, attach it
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;

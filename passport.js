const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config()
const db = require('./db/queries')
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try { 
      const user = await db.findUserByEmail(username);
      console.log(JSON.stringify(user));
      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      console.log(JSON.stringify(err));
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log(JSON.stringify(user));
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.selectUserById(id);
    console.log(JSON.stringify(user));  
    done(null, user);
  }
  catch(err) {
    console.log(JSON.stringify(err));
    done(err);
  }
});
module.exports = passport;
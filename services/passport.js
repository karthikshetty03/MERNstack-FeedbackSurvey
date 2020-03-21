const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const mongoose = require('mongoose')
const keys = require('../config/keys')


const User = mongoose.model('users')

// SET IDENTIFYING INFO TO COOKIE //
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// GET USER FROM COOKIE //
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user)
        })
})

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
    }, 
  async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleId : profile.id})
        if(existingUser){
            return done(null, existingUser)
        } 
        const user = await new User({googleId: profile.id,name: profile.name.givenName}).save()
        done(null, user)
    }
  )
)








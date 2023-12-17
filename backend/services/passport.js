const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys.js');
const mongoose = require('mongoose');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id); // user._id gives new ObjectId('actual id'), so rather use user.id as it will simply give the id.
});
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // '/' before auth is must.
}, async (accessToken, refreshToken, profile, done) => {

    try {
        const existing_user = await User.findOne({ googleID: profile.id });
        if (existing_user)
            return done(null, existing_user);
        else {
            try {
                const created_user = await User.create({ googleID: profile.id });
                return done(null, created_user);
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
    }
}));

// This file is not exporting anything. But, the above code needs to be run for initialization (creating an instance of google strategy) purpose, and so we just require it in the index.js file.
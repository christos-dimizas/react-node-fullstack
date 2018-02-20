const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

// Fetch model class of Users
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

// google OAuth setup with passportJS authentication flow strategy
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecretKey,
        callbackURL: '/auth/google/callback',
        proxy: true,
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({googleId: profile.id}).then((existingUser) => {
            if (existingUser) {
                done(null, existingUser);
            } else {
                new User({googleId: profile.id, name: profile.displayName, emailsList: profile.emails})
                    .save()
                    .then(user => done(null, user));
            }
        });
    })
);
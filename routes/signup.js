var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var morgan = require('morgan')
var passport = require('passport')
var LocalStrategy = require('passport-local')

var db = require('../models/db')
var UserModel = require('../models/User')
var User = db.model('User')
var auth = require('../lib/auth.js')

var app = express();

// middleware
app.use(morgan('[:date[iso]] :method :url :status'))

var createHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

passport.use('signup', new LocalStrategy({passReqToCallback : true},
    function(req, username, password, done) {
        findOrCreateUser = function() {
            User.findOne({'username':username}, function(err, user) {
            if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            }
            if (user) {
                console.log('User already exists')
                return done(null, false, req.flash('message', 'User Already Exists'))
            } else {
                var newUser = new User();
                newUser.username = username;
                newUser.password = createHash(password);
                newUser.email = req.body.email;
                newUser.fname = req.body.fname;
                newUser.lname = req.body.lname;

                newUser.save(function(err) {
                    if (err) {
                        console.log('Error in Saving user: ' + err);
                        throw err;
                    }
                    console.log('User Signup succesful: ' + username);
                    return done(null, newUser);
                });
            }
        })
    }
    // Delay the execution of findOrCreateUser and execute
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser)
}))


// Go to the signup page
router.get('/', auth.redirectToDashbaordIfLoggedIn, function(req, res) {
    res.render('user/signup.pug', { csrfToken: req.csrfToken(), message: req.flash('message') })
})

// Get the signup form data
router.post('/', passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash : true
}))

module.exports = router

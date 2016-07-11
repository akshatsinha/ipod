const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('client-sessions')
const csrf = require('csurf')
const passport = require('passport')
const flash = require('connect-flash')

// App Routes
var loginRoutes = require('./routes/login')
var signupRoutes = require('./routes/signup')
var dashboardRoutes = require('./routes/dashboard')
var logoutRoutes = require('./routes/logout')


const auth = require('./lib/auth')

const app = express();
app.set('view engine', 'pug');

// middleware
app.use(morgan('[:date[iso]] :method :url :status'))
app.use(express.static(__dirname + '/public'))
app.use('/bower_components',  express.static(__dirname + '/bower_components'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    cookieName: 'session',
    secret: 'grmelkglrkebafewjfnew',
    duration: 48 * 60 * 60 * 1000, // 2 days
    // duration: 4 * 30 * 24 * 60 * 60 * 1000, // 4 months
    activeDuration: 5 * 60 * 1000,
    httpOnly: true
}))

app.use(csrf())
app.use(function (req, res, next) {
    res.cookie("XSRF-TOKEN",req.csrfToken());
    return next();
});
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)
app.use('/logout', logoutRoutes)
app.use('/dashboard', auth.requireLogin, dashboardRoutes)

// Go to the index page
app.get('/', auth.redirectToDashbaordIfLoggedIn, function(req, res) {
    res.render('index.pug');
})


app.listen('3000')

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: { httpOnly: true } })
const logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const multer  = require('multer');
const passport = require('passport');

const upload = multer({ dest: 'uploads/' })
const { Dropzone } = require("dropzone");
Dropzone.autoDiscover = false;

const session = require('express-session');
const flash = require('connect-flash');
const route = require('./routes/index.route');
const db = require('./config/db/index');


// db connection
db.connect();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: 'mywebsite',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 180 * 60 * 1000,}
}));

app.use(flash());
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//setup public folder
app.use(express.static(path.join(__dirname, 'public')));


app.get('*', function(req,res,next) {

    res.locals.login = req.user;
    res.locals.cart = req.session.cart;
    console.log(res.locals.login)
    next();
 });
// Route init   
route(app);
        
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    // res.status(404).render('./pages/sites/error-404');
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
    // res.render('./pages/sites/error-500');
});

module.exports = app;
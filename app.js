'use strict';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const expressLayout = require('express-ejs-layouts');
const passport = require('./passport');
const session = require('express-session');
const flash = require('express-flash');

const indexRouter = require('./routes/indexRoute');
const usersRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const authRouter = require('./routes/authRoute');

const productApiRouter = require('./routes/api/productRoute');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // set ejs to default
app.use(expressLayout);
app.set('layout', './layouts/layout.ejs');
// Implement CORS
app.use(cors());
app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600 * 1000 //60p
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware express-flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.info = req.flash('info');

    next();
});

app.use('/', indexRouter);
app.use('/san-pham', productRouter);
app.use('/user', usersRouter);
app.use('/auth', authRouter);
app.use('/api/v1', productApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals,  only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.statusCode || 500);
    
    res.render('404');
});

module.exports = app;

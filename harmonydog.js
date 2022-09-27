const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');

const path = require('path');
const PORT = process.env.PORT || 1066;
const app = express();

// Declare static folder to serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// link route files for use below
const mainRoutes = require('./routes/main');
const dogRoutes = require('./routes/dogs');
const adminRoutes = require('./routes/admin');

// Use body parser middleware to get data from request.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable method override to allow for updating and deleting via forms, add querystring into route to activate
app.use(methodOverride('_method'));

// Load dotenv configurations for use
dotenv.config({ path: './config/config.env' });

// Load passport configurations for use
require('./config/passport')(passport);

// Connect to database by invoking function from db.js in config folder
connectDB();

// Enable morgan in development mode to improve console.logs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set ejs as view engine for template rendering
app.set('view engine', 'ejs');

// Enable session middleware to allow session use (must be declared above passport middleware)
// store session data in mongo database
app.use(
  session({
    secret: 'funny banana',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  })
);

// Enable passport middleware for authentication and authorization
app.use(passport.initialize());
app.use(passport.session());

// Enable flash message use for errors, information, etc
app.use(flash());

// Declare base routes for use
app.use('/', mainRoutes);
app.use('/dog', dogRoutes);
app.use('/admin', adminRoutes);

// Start server
app.listen(
  PORT,
  console.log(`Server is now running on ${PORT} in ${process.env.NODE_ENV}`)
);

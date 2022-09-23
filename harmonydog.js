const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');

const path = require('path');
const PORT = process.env.PORT || 1066;
const app = express();

// link route files for use below
const mainRoutes = require('./routes/main');

// Use body parser middleware to get data from request.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable method override to allow for updating and deleting via forms
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies for a _method value to activate override, delete _method after capture
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Load dotenv configurations for use
dotenv.config({ path: './config/config.env' });

// Load passport configurations for use
require('./config/passport')(passport);

// Connect to database by invoking function from db.js in config folder
connectDB();

// Enable morgan in development mode to improve console.logs
if (process.env.NODE.ENV === 'development') {
  app.use(morgan('dev'));
}

// Handlebar helpers will go here when developed

// Declare handlebars as app view engine
// declare default Layout and extension name for handlebar files
// will need to bring in handlebar helpers when they are ready
app.engine(
  '.hbs',
  engine({
    helpers: {},
    defaultLayout: 'main',
    extname: '.hbs',
  })
);

app.set('view engine', '.hbs');

// Enable session middleware to allow session use (must be declared above passport middleware)
// store session data in mongo database
app.use(
  session({
    secret: 'funny banana',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

// Enable passport middleware for authentication and authorization
app.use(passport.initialize());
app.use(passport.session());

// Declare static folder to serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Enable flash message use for errors, information, etc
app.use(flash());

// Declare base routes for use
app.use('/', mainRoutes);

// Start server
app.listen(
  PORT,
  console.log(`Server is now running on ${PORT} in ${process.env.NODE_ENV}`)
);

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const passport = require('passport');
const session = require('session');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

const path = require('path');
const PORT = process.env.PORT || 1066;
const app = express();

// link route files for use below
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const { type } = require('os');

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
dotenv.config({path: './config/config.env'});

// Load passport configurations for use
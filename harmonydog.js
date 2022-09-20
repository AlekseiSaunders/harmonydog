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

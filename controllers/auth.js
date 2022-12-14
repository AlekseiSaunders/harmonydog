const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');


// check if a user is logged in, if not, set privileges to 'user' to render menu conditionally in safest way
// if a user is logged in, then set privileges to their actually privileges value
// done for both controllers below

exports.getRegister = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('register', { user: req.user, privileges });
  } else {
    res.render('register', { user: req.user, privileges: req.user.privileges });
  }
};

exports.getLogin = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('login', { user: req.user, privileges });
  } else {
    res.render('login', { user: req.user, privileges: req.user.privileges });
  }
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log('User has logged out.');
    req.session.destroy((err) => {
      if (err)
        console.log(
          'Error : Failed to destroy the session during logout.',
          err
        );
      req.user = null;
      res.redirect('/');
    });
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.userEmail))
    validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: 'Password cannot be blank.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/login');
  }
  req.body.email = validator.normalizeEmail(req.body.userEmail, {
    gmail_remove_dots: false,
  });

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || '/profile');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.');
  });
  req.session.destroy((err) => {
    if (err)
      console.log('Error : Failed to destroy the session during logout.', err);
    req.user = null;
    res.redirect('/');
  });
};

exports.postRegister = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.userEmail))
    validationErrors.push({ msg: 'Please enter a valid email address.' });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: 'Your password must be at least 8 characters long.',
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: 'Your passwords do not match.' });
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('../register');
  }
  req.body.userEmail = validator.normalizeEmail(req.body.userEmail, {
    gmail_remove_dots: false,
  });

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.userEmail,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.userEmail }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash('errors', {
          msg: 'An account with that email address or username already exists.',
        });
        return res.redirect('../register');
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect('/profile');
        });
      });
    }
  );
};

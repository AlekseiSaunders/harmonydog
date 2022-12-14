const User = require('../models/User');
const Dog = require('../models/Dog');
const passport = require('passport');
const Tip = require('../models/Tip');

// checking user privileges, if they are user, display profile view
// if they are admin or root, display dashboard view
exports.getProfile = async (req, res) => {
  try {
    const user = await User.find({ user: req.user.id });
    const dogs = await Dog.find({ owner: req.user.id });
    if (req.user.privileges === 'user' || req.user.privileges === 'demo') {
      res.render('profile', {
        user: req.user,
        privileges: req.user.privileges,
        dogs: dogs,
      });
    } else {
      // using mongoDB aggregate to bring in dogs related to the user
      // add them to user document temporarily to combine documents for dashboard view
      const tips = await Tip.find();
      const users = await User.aggregate([
        {
          $lookup: {
            from: 'dogs',
            localField: '_id',
            foreignField: 'owner',
            as: 'pets',
          },
        },
      ]);
      res.render('dashboard', {
        tips: tips,
        user: req.user,
        users: users,
        privileges: req.user.privileges,
        dogs: dogs,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

exports.getUserEdit = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (req.user.privileges === 'user' || req.user.privileges === 'demo') {
      res.render('editUser', {
        user: user,
        privileges: user.privileges,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findById({ _id: req.params.id });
    if (!user) {
      res.render('/profile');
    }
    user = await User.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: false, runValidators: true }
    );
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await Dog.deleteMany({ owner: req.params.id });
    req.logout(() => {
      console.log('User has logged out.');
    });
    await User.deleteOne({ _id: req.params.id });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
};

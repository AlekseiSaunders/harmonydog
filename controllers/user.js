const User = require('../models/User');
const Dog = require('../models/Dog');
const mongoose = require('mongoose');
const agg = [
  {
    $lookup: {
      from: 'dogs',
      localField: '_id',
      foreignField: 'owner',
      as: 'pets',
    },
  },
];

exports.getProfile = async (req, res) => {
  try {
    const user = await User.find({ user: req.user.id });
    const dogs = await Dog.find({ owner: req.user.id });
    res.render('profile', {
      user: req.user,
      privileges: req.user.privileges,
      dogs: dogs,
    });
  } catch (err) {
    console.err(err);
  }
};

exports.getDashboard = async (req, res) => {
  try {
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
    console.log(users[1].pets[0].name);
    res.render('dashboard', {
      user: req.user,
      users: users,
      privileges: req.user.privileges,
    });
  } catch (err) {
    console.error(err);
  }
};

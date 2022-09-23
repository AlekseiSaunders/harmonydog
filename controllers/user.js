const User = require('../models/User');
const Dog = require('../models/Dog');

exports.getProfile = async (req, res) => {
  try {
    const dogs = await Dog.find({ user: req.user.id }).lean();
    res.render('profile', { firstName: req.user.firstName, user: req.user });
  } catch (err) {
    console.err(err);
  }
};

const User = require('../models/User');
const Dog = require('../models/Dog');


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


const User = require('../models/User');
const Dog = require('../models/Dog');

// using mongoDB aggregate to bring in dogs related to the user
// add them to user document temporarily to combine documents for dashboard view
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
    res.render('dashboard', {
      user: req.user,
      users: users,
      privileges: req.user.privileges,
    });
  } catch (err) {
    console.error(err);
  }
};

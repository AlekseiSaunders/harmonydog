const User = require('../models/User');
const Dog = require('../models/Dog');


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

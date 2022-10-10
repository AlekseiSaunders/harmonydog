const User = require('../models/User');
const Tip = require('../models/Tip');
const cloudinary = require('../middleware/cloudinary');

// using mongoDB aggregate to bring in dogs related to the user
// add them to user document temporarily to combine documents for dashboard view
exports.getDashboard = async (req, res) => {
  try {
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
      user: req.user,
      users: users,
      privileges: req.user.privileges,
      tips: tips,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getCreateTip = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('/', { user: req.user, privileges });
  } else if (req.user.privileges === 'user' || req.user.privileges === 'demo') {
    req.user.privileges;
    res.render('/', { user: req.user, privileges });
  } else {
    res.render('addTip', { user: req.user, privileges: req.user.privileges });
  }
};

exports.postAddTip = async (req, res) => {
  try {
    //upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    Tip.create({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      image: result.secure_url,
      cloudinaryId: result.public_id,
    });
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
  }
};

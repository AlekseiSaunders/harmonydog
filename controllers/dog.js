const cloudinary = require('../middleware/cloudinary');
const validator = require('validator');
const User = require('../models/User');
const Dog = require('../models/Dog');

exports.getDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    res.render('dogProfile.ejs', {
      dog: dog,
      user: req.user,
      privileges: req.user.privileges,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getRegister = async (req, res) => {
  try {
    const user = await User.find({ user: req.user.id });
    res.render('registerDog', {
      user: req.user,
      privileges: req.user.privileges,
    });
  } catch (err) {
    console.err(err);
  }
};

exports.createDog = async (req, res) => {
  try {
    //upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    await Dog.create({
      name: req.body.name,
      gender: req.body.gender.toLowerCase(),
      breed: req.body.breed,
      age: req.body.age,
      weight: req.body.weight,
      image: result.secure_url,
      cloudinaryId: result.public_id,
      notes: req.body.notes,
      owner: req.user.id,
    });
    console.log('Doggo has been added!');
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
  }
};

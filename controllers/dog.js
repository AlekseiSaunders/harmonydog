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
      gender: req.body.gender,
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

exports.editDog = async (req, res) => {
  try {
    let dog = await Dog.findOne({
      _id: req.params.id,
    }).lean();
    if (!dog) {
      res.redirect('/profile');
    } else {
      res.render('edit', {
        privileges: req.user.privileges,
        user: req.user,
        dog,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.updateDog = async (req, res) => {
  try {
    let dog = await Dog.findById(req.params.id);
    console.log(req.body);
    if (!dog) {
      res.render('/profile');
    }
    dog = await Dog.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
  }
};

exports.deleteDog = async (req, res) => {
  try {
    let dog = await Dog.findById({ _id: req.params.id });
    await cloudinary.uploader.destroy(dog.cloudinaryId);
    await Dog.remove({ _id: req.params.id });
    console.log('deleted dog');
    res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.redirect('/profile');
  }
};

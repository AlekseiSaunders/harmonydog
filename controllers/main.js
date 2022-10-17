const Tip = require('../models/Tip');

exports.getIndex = async (req, res) => {
  try {
    const tips = await Tip.find();
    let tipsToDisplay = [];
// generate random number and use to select tip from all tips returned from DB find
// if tip has not already been selected, push to tipsToDisplay array, 
// if already selected, find another.
    do {
      let rand = Math.floor(Math.random() * tips.length);
      if (tipsToDisplay.indexOf(tips[rand]) == -1) {
        tipsToDisplay.push(tips[rand]);
      }
// continue until three tips from tips returned from DB are selected
    } while (tipsToDisplay.length < 3);
    if (!req.user) {
      let privileges = 'user';
      res.render('index', {
        tips: tipsToDisplay,
        user: req.user,
        privileges,
      });
    } else {
      res.render('index', {
        tips: tipsToDisplay,
        user: req.user,
        privileges: req.user.privileges,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// check if a user is logged in, if not, set privileges to 'user' to render menu conditionally in safest way
// if a user is logged in, then set privileges to their actually privileges value
// done for both controllers below

exports.getAbout = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('about', { user: req.user, privileges });
  } else {
    res.render('about', { user: req.user, privileges: req.user.privileges });
  }
};

// since these views are nested within the views folder, in services, the render route must change to included that
exports.getServices = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('services/services', { user: req.user, privileges });
  } else {
    res.render('services/services', {
      user: req.user,
      privileges: req.user.privileges,
    });
  }
};

exports.getDogwalking = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('services/dogwalking', { user: req.user, privileges });
  } else {
    res.render('services/dogwalking', {
      user: req.user,
      privileges: req.user.privileges,
    });
  }
};

exports.getAlaCarte = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('services/alacarte', { user: req.user, privileges });
  } else {
    res.render('services/alacarte', {
      user: req.user,
      privileges: req.user.privileges,
    });
  }
};

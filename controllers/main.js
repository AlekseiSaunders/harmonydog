exports.getIndex = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('index', { user: req.user, privileges });
  } else {
    res.render('index', { user: req.user, privileges: req.user.privileges });
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

exports.getServices = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('services', { user: req.user, privileges });
  } else {
    res.render('services', { user: req.user, privileges: req.user.privileges });
  }
};

exports.getDogwalking = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('dogwalking', { user: req.user, privileges });
  } else {
    res.render('dogwalking', {
      user: req.user,
      privileges: req.user.privileges,
    });
  }
};

exports.getAlaCarte = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('alacarte', { user: req.user, privileges });
  } else {
    res.render('alacarte', {
      user: req.user,
      privileges: req.user.privileges,
    });
  }
};

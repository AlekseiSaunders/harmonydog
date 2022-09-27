exports.getIndex = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('index', { user: req.user, privileges });
  } else {
    res.render('index', { user: req.user, privileges: req.user.privileges });
  }
};

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

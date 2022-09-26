exports.getIndex = (req, res) => {
  if (!req.user) {
    let privileges = 'user';
    res.render('index', { user: req.user, privileges });
  } else {
    res.render('index', { user: req.user, privileges: req.user.privileges });
  }
};

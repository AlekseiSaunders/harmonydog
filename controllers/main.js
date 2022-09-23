exports.getIndex = (req, res) => {
  res.render('index.hbs', { user: req.user });
};

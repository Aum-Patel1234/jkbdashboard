exports.getAllUsers = (req, res) => {
  // console.log(req.path);
  res.render('layout.ejs', { currentPath: req.path , contentPath: 'partials/users'});
};
exports.getAllSubjects = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path , contentPath: 'partials/subjects' });
};
exports.getAllPackages = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path , contentPath: 'partials/packages' });
};
exports.getAllBranches = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path , contentPath: 'partials/branches' });
};
exports.getAllPayments = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path , contentPath: 'partials/payments' });
};
exports.predict = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path , contentPath: 'partials/predict' });
};
exports.attendance = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path , contentPath: 'partials/attendance' });
};
exports.tests = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path , contentPath: 'partials/tests' });
};
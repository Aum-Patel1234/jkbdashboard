const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');

router.get('/', (req, res) => {
  res.redirect('/users');
});

router.get('/users', controller.getAllUsers);
router.get('/users/add', (req, res) => {
  res.render('studentForm.ejs');
});
router.post('/users/add', controller.addUser);
router.get('/subjects', controller.getAllSubjects);
router.get('/packages', controller.getAllPackages);
router.get('/branches', controller.getAllBranches);
router.get('/payments', controller.getAllPayments);
router.get('/predict', controller.predict);
router.get('/attendance', controller.attendance);
router.get('/tests', controller.tests);

router.get('/logout', (req, res) => {
  res.redirect('/users');
});

module.exports = router;

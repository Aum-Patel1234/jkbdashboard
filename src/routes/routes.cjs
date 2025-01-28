const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeController.cjs');

router.get('/', (req, res) => {
  res.redirect('/users');
});

router.get('/users', controller.getAllUsers);
router.get('/subjects', controller.getAllSubjects);
router.get('/packages', controller.getAllPackages);
router.get('/branches', controller.getAllBranches);
router.get('/payments', controller.getAllPayments);
router.get('/predict', controller.predict);
router.get('/attendance', controller.attendance);
router.get('/tests', controller.tests);

router.get('/logout', (req, res)=>{
  res.redirect('/users');
});

module.exports = router;

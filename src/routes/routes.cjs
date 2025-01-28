const express = require('express');
const router = express.Router();
const controller = require('../controllers/homeController.cjs');

router.get('/', (req, res) => {
  res.render('index.ejs');
});

router.get('/users', controller.getAllUsers);

module.exports = router;

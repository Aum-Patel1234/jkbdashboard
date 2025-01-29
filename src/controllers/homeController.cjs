'use strict';

const { QueryTypes } = require('sequelize');
const sequelize = require('../config/db.cjs');
const Student = require('../models/studentModel.cjs');

exports.getAllUsers = async (req, res) => {
  try {
    const result = await Student.sequelize.query("SELECT * FROM students", { type: QueryTypes.SELECT });
    res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/users', students: result });
  } catch (err) {
    console.log(err);
    res.render('layout.ejs', {
      currentPath: req.path,
      contentPath: 'partials/users',
      students: []
    });
  }
  // res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/users' });
};
exports.getAllSubjects = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/subjects' });
};
exports.getAllPackages = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/packages' });
};
exports.getAllBranches = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/branches' });
};
exports.getAllPayments = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/payments' });
};
exports.predict = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/predict' });
};
exports.attendance = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/attendance' });
};
exports.tests = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/tests' });
};

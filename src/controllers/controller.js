'use strict';

const { QueryTypes, Op } = require('sequelize');
const sequelize = require('../config/db.js');
const Student = require('../models/studentModel.js');

exports.getAllUsers = async (req, res) => {
  try {
    const result = await Student.sequelize.query("SELECT * FROM students", { type: QueryTypes.SELECT });
    // const result = await Student.findAll();

    // Pagination - https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination

    res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/users', students: result, customScript: '<script src="/js/users.js"></script>' });
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

exports.getUser = async (req, res) => {

};

exports.addUser = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    // Create an object containing all request body fields
    const obj = {
      full_name: req.body.full_name,
      email: req.body.email,
      branch: req.body.branch,
      student_contact: req.body.student_contact,
      parent_contact: req.body.parent_contact,
      subjects: req.body.subjects ? req.body.subjects.split(",").map(s => s.trim()) : [],
      xii_diploma_type: req.body.xii_diploma_type,
      xii_diploma_score: req.body.xii_diploma_score,
      cet_jee_type: req.body.cet_jee_type,
      cet_jee_score: req.body.cet_jee_score,
      address: req.body.address,
      college_name: req.body.college_name,
      password: req.body.password,
      c_password: req.body.c_password,
      totalfees: req.body.totalfees,
      studentfees: req.body.studentfees,
      packages: req.body.packages ? req.body.packages.split(",").map(p => p.trim()) : [],
    };

    if (obj.c_password !== obj.password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const newStudent = await Student.create(obj);

    // Save into the database
    await newStudent.save();

    // res.status(201).json({ message: "Student registered successfully", data: newStudent });
    res.redirect('/users');
  } catch (error) {
    if (error.errors) {
      error.errors.forEach((err) => {
        console.error("Validation error:", err.message);
      });
      res.status(400).json({ error: error.message });
    }
  }
};
exports.editUserPage = (req, res) => {
  const id = req.params.id;

  const data = Student.findAll({
    where: {
      id: id,
    }
  });

  return res.render('studentForm.ejs', { data: data });
}
exports.editUser = (req, res) => {
  try {
    const id = req.params.id;

    const editedCount = Student.update({}, {});

    if (editedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User edited successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.deleteUser = (req, res) => {
  try {
    const id = req.params.id;

    const deletedCount = Student.destroy({
      where: {
        id: id
      },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getAllSubjects = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/subjects', students: [] });
};
exports.getAllPackages = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/packages', students: [] });
};
exports.getAllBranches = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/branches', students: [] });
};
exports.getAllPayments = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/payments', students: [] });
};
exports.predict = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/predict', students: [] });
};
exports.attendance = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/attendance', students: [] });
};
exports.tests = (req, res) => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/tests', students: [] });
};

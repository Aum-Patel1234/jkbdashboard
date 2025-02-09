'use strict';

import { Request, Response } from 'express';
import Student from '../models/studentModel';
import { QueryTypes, ValidationError } from 'sequelize';
// const sequelize = require('../config/db');

exports.getAllUsers = async (req: Request, res: Response): Promise<void> => {
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

exports.getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = await Student.findOne({
      where: {
        id: req.params.id,
      }
    });

    return res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/student_detail', students: userData });
  } catch (err) {
    console.log(err);
  }
};

// assign the type that it returns
exports.addUser = async (req: Request, res: Response) => {
  try {
    console.log("Received Data:", req.body);

    // Create an object containing all request body fields
    const obj = {
      full_name: req.body.full_name,
      email: req.body.email,
      branch: req.body.branch,
      student_contact: req.body.student_contact,
      parent_contact: req.body.parent_contact,
      subjects: typeof (req.body.subjects) === 'string' ? req.body.subjects.split(",").map((s: string) => s.trim()) : [],
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
      packages: typeof (req.body.packages) === 'string' ? req.body.packages.split(",").map((p: string) => p.trim()) : [],
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
    if (error instanceof ValidationError) {
      error.errors.forEach((err) => {
        console.error("Validation error:", err.message);
      });
      res.status(400).json({ error: error.message });
    }
  }
};

exports.editUserPage = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  try {
    const data = await Student.findOne({
      where: { id: id },
    });

    return res.render('studentForm.ejs', { user: data });
  } catch (error) {
    console.log(error);
  }
};

// assign the type that it returns
exports.editUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const obj = {
      full_name: req.body.full_name,
      email: req.body.email,
      branch: req.body.branch,
      student_contact: req.body.student_contact,
      parent_contact: req.body.parent_contact,
      subjects: typeof (req.body.subjects) === 'string' ? req.body.subjects.split(",").map((s: string) => s.trim()) : [],
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
      packages: typeof (req.body.packages) === 'string' ? req.body.packages.split(",").map((p: string) => p.trim()) : [],
    };

    const [editedCount] = await Student.update(obj,
      { where: { id: id } }
    );

    if (editedCount === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    res.redirect('/users');
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// assign the type that it returns
exports.deleteUser = (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const deletedCount: number = Student.destroy({
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

exports.getAllSubjects = (req: Request, res: Response): void => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/subjects', students: [] });
};
exports.getAllPackages = (req: Request, res: Response): void => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/packages', students: [] });
};
exports.getAllBranches = (req: Request, res: Response): void => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/branches', students: [] });
};
exports.getAllPayments = (req: Request, res: Response): void => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/payments', students: [] });
};
exports.predict = (req: Request, res: Response): void => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/predict', students: [] });
};
exports.attendance = (req: Request, res: Response): void => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/attendance', students: [] });
};
exports.tests = (req: Request, res: Response): void => {
  res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/tests', students: [] });
};

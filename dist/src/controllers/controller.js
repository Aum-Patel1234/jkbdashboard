'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentModel_1 = __importDefault(require("../models/studentModel"));
const sequelize_1 = require("sequelize");
// const sequelize = require('../config/db');
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield studentModel_1.default.sequelize.query("SELECT * FROM students", { type: sequelize_1.QueryTypes.SELECT });
        // const result = await Student.findAll();
        // Pagination - https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination
        res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/users', students: result, customScript: '<script src="/js/users.js"></script>' });
    }
    catch (err) {
        console.log(err);
        res.render('layout.ejs', {
            currentPath: req.path,
            contentPath: 'partials/users',
            students: []
        });
    }
    // res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/users' });
});
exports.getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield studentModel_1.default.findOne({
            where: {
                id: req.params.id,
            }
        });
        return res.render('layout.ejs', { currentPath: req.path, contentPath: 'partials/student_detail', students: userData });
    }
    catch (err) {
        console.log(err);
    }
});
exports.searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.body.query;
        let userData;
        if (query && query.length > 0) {
            userData = yield studentModel_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        { full_name: { [sequelize_1.Op.iLike]: `%${query}%` } }, // Case-insensitive search
                        { email: { [sequelize_1.Op.iLike]: `%${query}%` } }
                    ]
                }
            });
        }
        else {
            userData = yield studentModel_1.default.findAll();
        }
        res.json(userData);
    }
    catch (err) {
        console.log(err);
    }
});
// assign the type that it returns
exports.addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Received Data:", req.body);
        // Create an object containing all request body fields
        const obj = {
            full_name: req.body.full_name,
            email: req.body.email,
            branch: req.body.branch,
            student_contact: req.body.student_contact,
            parent_contact: req.body.parent_contact,
            subjects: typeof (req.body.subjects) === 'string' ? req.body.subjects.split(",").map((s) => s.trim()) : [],
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
            packages: typeof (req.body.packages) === 'string' ? req.body.packages.split(",").map((p) => p.trim()) : [],
        };
        if (obj.c_password !== obj.password) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const newStudent = yield studentModel_1.default.create(obj);
        // Save into the database
        yield newStudent.save();
        // res.status(201).json({ message: "Student registered successfully", data: newStudent });
        res.redirect('/users');
    }
    catch (error) {
        if (error instanceof sequelize_1.ValidationError) {
            error.errors.forEach((err) => {
                console.error("Validation error:", err.message);
            });
            res.status(400).json({ error: error.message });
        }
    }
});
exports.editUserPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const data = yield studentModel_1.default.findOne({
            where: { id: id },
        });
        return res.render('studentForm.ejs', { user: data });
    }
    catch (error) {
        console.log(error);
    }
});
// assign the type that it returns
exports.editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const obj = {
            full_name: req.body.full_name,
            email: req.body.email,
            branch: req.body.branch,
            student_contact: req.body.student_contact,
            parent_contact: req.body.parent_contact,
            subjects: typeof (req.body.subjects) === 'string' ? req.body.subjects.split(",").map((s) => s.trim()) : [],
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
            packages: typeof (req.body.packages) === 'string' ? req.body.packages.split(",").map((p) => p.trim()) : [],
        };
        const [editedCount] = yield studentModel_1.default.update(obj, { where: { id: id } });
        if (editedCount === 0) {
            return res.status(404).json({ message: "user not found" });
        }
        res.redirect('/users');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
// assign the type that it returns
exports.deleteUser = (req, res) => {
    try {
        const id = req.params.id;
        const deletedCount = studentModel_1.default.destroy({
            where: {
                id: id
            },
        });
        if (deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
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

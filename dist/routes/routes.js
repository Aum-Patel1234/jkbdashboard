"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require('../controllers/controller');
router.get('/', (req, res) => {
    res.redirect('/users');
});
router.get('/users', controller.getAllUsers);
router.post('/users', controller.searchUser);
// users/add should be above 'users/:id' as it is interfering
router.get('/users/add', (req, res) => {
    res.render('studentForm.ejs', { user: null });
});
router.post('/users/add', controller.addUser);
router.get('/users/:id', controller.getUser);
router.delete('/users/:id', controller.deleteUser);
router.post('/users/edit/:id', controller.editUserPage);
router.put('/users/edit/:id', controller.editUser);
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
exports.default = router;

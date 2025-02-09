import express, { Request, Response } from 'express';
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', (req: Request, res: Response): void => {
  res.redirect('/users');
});

router.get('/users', controller.getAllUsers);
router.post('/users', controller.searchUser);
// users/add should be above 'users/:id' as it is interfering
router.get('/users/add', (req: Request, res: Response): void => {
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

router.get('/logout', (req, res): void => {
  res.redirect('/users');
});

export default router;

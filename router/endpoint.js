const express = require('express');
const router = express.Router();
const AccesToken = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const server = require('../controller/serverController');
router.get('/', server.server); 

const login = require('../controller/auth/login');
const register = require('../controller/auth/register');
router.post('/login', login.login);
router.post('/register', register.register);

const user = require('../controller/user');
router.get('/user', AccesToken, checkRole('Admin'), user.getAllUsers);
router.get('/user/:id', AccesToken, checkRole('Admin'), user.getUsersById);
router.post('/user', AccesToken, checkRole('Admin'), user.addUser);
router.put('/user/:id', AccesToken, checkRole('Admin'), user.updateUser);
router.delete('/user/:id', AccesToken, checkRole('Admin'), user.deleteUser);
router.put('/user/restore/:id', AccesToken, checkRole('Admin'), user.restoreUser);

const pakaianController = require('../controller/pakaianController');
router.get('/pakaian', AccesToken, checkRole('Admin'), pakaianController.getAllPakaian);

module.exports = router;

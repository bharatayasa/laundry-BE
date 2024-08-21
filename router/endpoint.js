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

const user = require('../controller/userContorller');
router.get('/user', AccesToken, checkRole('Admin'), user.getAllUsers);
router.get('/user/:id', AccesToken, checkRole('Admin'), user.getUsersById);
router.post('/user', AccesToken, checkRole('Admin'), user.addUser);
router.put('/user/:id', AccesToken, checkRole('Admin'), user.updateUser);
router.delete('/user/:id', AccesToken, checkRole('Admin'), user.deleteUser);
router.put('/user/restore/:id', AccesToken, checkRole('Admin'), user.restoreUser);

const laporan = require('../controller/laporanController')
router.get('/laporan', AccesToken, checkRole('Admin'), laporan.getAllLaporan);

const pelanggan = require('../controller/pelangganController')
router.get('/pelanggan', AccesToken, checkRole('Kasir'), pelanggan.getAllPelanggan);
router.get('/pelanggan/:id', AccesToken, checkRole('Kasir'), pelanggan.getPelangganById);

const pakaianController = require('../controller/pakaianController');
router.get('/pakaian', AccesToken, checkRole('Admin'), pakaianController.getAllPakaian);

module.exports = router;

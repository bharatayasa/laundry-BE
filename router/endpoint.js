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

const toggleUser = require('../controller/toggleUser')
router.post('/active', toggleUser.aktifUser);
router.post('/nonactive', toggleUser.nonaktifUser);

const user = require('../controller/userContorller');
router.get('/user', AccesToken, checkRole('Admin'), user.getAllUsers);
router.get('/user/:id', AccesToken, checkRole('Admin'), user.getUsersById);
router.post('/user', AccesToken, checkRole('Admin'), user.addUser);
router.put('/user/:id', AccesToken, checkRole('Admin'), user.updateUser);
router.delete('/user/:id', AccesToken, checkRole('Admin'), user.deleteUser);
router.put('/user/restore/:id', AccesToken, checkRole('Admin'), user.restoreUser);
router.get('/user/admin/role', AccesToken, checkRole('Admin'), user.getUserByRole);

const laporan = require('../controller/laporanController');
router.get('/laporan', AccesToken, checkRole('Admin'), laporan.getAllLaporan);
router.get('/laporan/:id', AccesToken, checkRole('Admin'), laporan.getLaporanById);
router.post('/laporan', AccesToken, checkRole('Admin'), laporan.addLaporan);
router.put('/laporan/:id', AccesToken, checkRole('Admin'), laporan.updateLaporan);
router.delete('/laporan/:id', AccesToken, checkRole('Admin'), laporan.deleteLaporan);
router.get('/cetak/laporan', AccesToken, checkRole('Admin'), laporan.cetakLaporanCSV);

const pelanggan = require('../controller/pelangganController');
router.get('/pelanggan', AccesToken, checkRole('Kasir'), pelanggan.getAllPelanggan);
router.get('/pelanggan/:id', AccesToken, checkRole('Kasir'), pelanggan.getPelangganById);
router.post('/pelanggan', AccesToken, checkRole('Kasir'), pelanggan.addPelanggan);
router.put('/pelanggan/edit/:id', AccesToken, checkRole('Kasir'), pelanggan.editPelanggan);
router.put('/pelanggan/:id', AccesToken, checkRole('Kasir'), pelanggan.restorePelanggan);
router.delete('/pelanggan/:id', AccesToken, checkRole('Kasir'), pelanggan.deletePelanggan);

const pendaftaran = require('../controller/pendaftaranController'); 
router.get('/pendaftaran', AccesToken, checkRole('Kasir', 'Admin'), pendaftaran.getAllPendaftaran);
router.get('/pendaftaran/:id', AccesToken, checkRole('Kasir'), pendaftaran.getPendaftaranById);
router.post('/pendaftaran', AccesToken, checkRole('Kasir'), pendaftaran.addPendaftaran);
router.get('/kasir/pendaftaran', AccesToken, checkRole('Kasir'), pendaftaran.getUser);
router.put('/pendaftaran/:id', AccesToken, checkRole('Kasir'), pendaftaran.updatePendaftaran);
router.delete('/pendaftaran/:id', AccesToken, checkRole('Kasir'), pendaftaran.deletePendaftaran);

const pakaian = require('../controller/pakaianController');
router.get('/pakaian', AccesToken, checkRole('Kasir', 'Pengolahan', 'Kurir'), pakaian.getAllPakaian);
router.get('/pakaian/:id', AccesToken, checkRole('Kasir'), pakaian.getPakaianById);
router.post('/pakaian', AccesToken, checkRole('Kasir'), pakaian.addPakaian);
router.put('/pakaian/:id', AccesToken, checkRole('Kasir'), pakaian.editPakaian);
router.delete('/pakaian/:id', AccesToken, checkRole('Kasir'), pakaian.deletePakaian);

const pembayaran = require('../controller/pembayaranController');
router.get('/pembayaran', AccesToken, checkRole('Kasir', 'Admin'), pembayaran.getAllPembayaran);
router.get('/pembayaran/:id', AccesToken, checkRole('Kasir'), pembayaran.getPembayaranById);
router.post('/pembayaran', AccesToken, checkRole('Kasir'), pembayaran.addPembayaran);
router.put('/pembayaran/:id', AccesToken, checkRole('Kasir'), pembayaran.updatePembayaran);
router.delete('/pembayaran/:id', AccesToken, checkRole('Kasir'), pembayaran.deletePembayaran);
router.get('/pembayaran/download/:id', AccesToken, checkRole('Kasir'), pembayaran.downloadInvoice);
router.get('/admin/pembayaran', AccesToken, checkRole('Admin'), pembayaran.getAllPembayaranByAdmin);

const pengolahan = require('../controller/pengolahanController');
router.get('/pengolahan', AccesToken, checkRole('Pengolahan', 'Kurir', 'Admin'), pengolahan.getAllPengolahan);
router.get('/pengolahan/:id', AccesToken, checkRole('Pengolahan'), pengolahan.getPengolahanById);
router.post('/pengolahan', AccesToken, checkRole('Pengolahan'), pengolahan.addPengolahan);
router.put('/pengolahan/:id', AccesToken, checkRole('Pengolahan'), pengolahan.updatePengolahan);
router.delete('/pengolahan/:id', AccesToken, checkRole('Pengolahan'), pengolahan.deletePengolahan);

const pengiriman = require('../controller/pengirimanController'); 
router.get('/pengiriman', AccesToken, checkRole('Kurir', 'Admin'), pengiriman.getAllPengiriman);
router.get('/pengiriman/:id', AccesToken, checkRole('Kurir'), pengiriman.getPengirimanById);
router.post('/pengiriman', AccesToken, checkRole('Kurir'), pengiriman.addPengiriman);
router.put('/pengiriman/:id', AccesToken, checkRole('Kurir'), pengiriman.updatePengiriman);
router.get('/kurir/pengirirman', AccesToken, checkRole('Kurir'), pengiriman.getKurirByKurir);
router.delete('/pengiriman/:id', AccesToken, checkRole('Kurir'), pengiriman.deletePengiriman);

module.exports = router;

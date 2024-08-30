const connection = require('../config/db');
const moment = require('moment'); 

const formatRupiah = (angka) => {
    if (typeof angka !== 'number') {
        angka = parseFloat(angka);
    }
    return angka.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
};

module.exports = {
    getAllPembayaran: async (req, res) => {
        const sql = `
            SELECT
                b.id_pembayaran, 
                b.id_pendaftaran,
                b.id_user,
                b.tanggal_pembayaran,
                b.status,
                b.total_biaya,
                u.username,
                p.tanggal_pendaftaran,
                p.id_pelanggan
            FROM
                Pembayaran b
            INNER JOIN
                Pendaftaran p ON b.id_pendaftaran = p.id_pendaftaran
            INNER JOIN 
                User u ON b.id_user = u.id_user
            WHERE 
                b.deleted_at IS NULL
            ORDER BY 
                b.id_pembayaran DESC;
        `;
        try {
            const pembayarans = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
    
            const idPelangganArray = pembayarans.map((pembayaran) => pembayaran.id_pelanggan);
            const idPendafataranArray = pembayarans.map((pembayaran) => pembayaran.id_pendaftaran);
    
            const sqlPelanggan = `SELECT id_pelanggan, nama FROM Pelanggan WHERE id_pelanggan IN (${idPelangganArray.join(',')})`;
            const sqlBerat = `SELECT id_pendaftaran, berat FROM Pakaian WHERE id_pendaftaran IN (${idPendafataranArray.join(',')})`;
    
            const pelanggans = await new Promise((resolve, reject) => {
                connection.query(sqlPelanggan, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
    
            const berats = await new Promise((resolve, reject) => {
                connection.query(sqlBerat, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
    
            const formatPembayaran = pembayarans.map((pembayaran) => {
                const pelanggan = pelanggans.find((pel) => pel.id_pelanggan === pembayaran.id_pelanggan);
                const berat = berats.find((ber) => ber.id_pendaftaran === pembayaran.id_pendaftaran);
    
                return {
                    id_pembayaran: pembayaran.id_pembayaran,
                    id_pendaftaran: pembayaran.id_pendaftaran,
                    id_user: pembayaran.id_user,
                    nama: pelanggan ? pelanggan.nama : 'Nama tidak ditemukan',
                    tanggal_pendaftaran: moment(pembayaran.tanggal_pendaftaran).format('DD-MM-YYYY'),
                    username: pembayaran.username,
                    berat: berat ? berat.berat : 'Berat tidak ditemukan',
                    total_biaya: formatRupiah(pembayaran.total_biaya),
                    tanggal_pembayaran: moment(pembayaran.tanggal_pembayaran).format('DD-MM-YYYY'),
                    status: pembayaran.status
                };
            });
    
            return res.status(200).json({
                status: true, 
                message: "Success to get all data pembayaran", 
                data: formatPembayaran
            });
    
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error', 
                error: error.message 
            });
        }
    },
    addPembayaran: async (req, res) => {
        const { id_pendaftaran, id_user, status } = req.body;

        const sqlInsert = "INSERT INTO Pembayaran (id_pendaftaran, id_user, total_biaya, status) VALUES (?, ?, ?, ?);";
        const sqlHarga = "SELECT harga FROM harga LIMIT 1";
        const sqlBerat = "SELECT berat FROM Pakaian WHERE id_pendaftaran = ?";

        try {
            const hargas = await new Promise((resolve, reject) => {
                connection.query(sqlHarga, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });

            const berats = await new Promise((resolve, reject) => {
                connection.query(sqlBerat, [id_pendaftaran], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });

            const hargaPerKg = hargas[0].harga;
            const beratTotal = berats.reduce((total, item) => total + item.berat, 0);
            const totalBiaya = beratTotal * hargaPerKg;

            const pembayarans = await new Promise((resolve, reject) => {
                connection.query(sqlInsert, [id_pendaftaran, id_user, totalBiaya, status], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(201).json({
                status: true,
                message: "Pembayaran berhasil ditambahkan",
                data: pembayarans
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },
    getPembayaranById: async (req, res) => {
        const id = req.params.id;
        const sql = "SELECT id_pendaftaran, id_user, status FROM Pembayaran WHERE id_pembayaran = ?";
    
        try {
            const pembayaran = await new Promise((resolve, reject) => {
                connection.query(sql, [id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result[0]);
                });
            });
    
            if (!pembayaran) {
                return res.status(404).json({
                    status: false,
                    message: "Pembayaran not found",
                });
            }
    
            return res.status(200).json({
                status: true,
                message: "Success to get pembayaran by id",
                data: pembayaran,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    },    
    updatePembayaran: async (req, res) => {
        const { id_pendaftaran, id_user, status } = req.body;
        const id = req.params.id;
    
        const sqlUpdate = `
            UPDATE Pembayaran 
            SET id_pendaftaran = ?, id_user = ?, total_biaya = ?, status = ?
            WHERE id_pembayaran = ?;
        `;
        const sqlHarga = "SELECT harga FROM harga LIMIT 1";
        const sqlBerat = "SELECT berat FROM Pakaian WHERE id_pendaftaran = ?";
    
        try {
            const hargas = await new Promise((resolve, reject) => {
                connection.query(sqlHarga, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
    
            const berats = await new Promise((resolve, reject) => {
                connection.query(sqlBerat, [id_pendaftaran], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
    
            const hargaPerKg = hargas[0].harga;
            const beratTotal = berats.reduce((total, item) => total + item.berat, 0);
            const totalBiaya = beratTotal * hargaPerKg;
    
            const pembayarans = await new Promise((resolve, reject) => {
                connection.query(sqlUpdate, [id_pendaftaran, id_user, totalBiaya, status, id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
    
            return res.status(200).json({
                status: true,
                message: "Success to update pembayaran",
                data: pembayarans
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },
    deletePembayaran: async (req, res) => {
        const sql = "UPDATE Pembayaran SET deleted_at = NOW() WHERE id_pembayaran = ?";
        const id = req.params.id;

        try {
            const pembayarans = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(200).json({
                status: true,
                message: "Success to delete pembayaran",
                data: pembayarans
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    }
}

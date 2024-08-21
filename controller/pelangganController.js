const connection = require('../config/db');
const moment = require('moment'); 

module.exports = {
    getAllPelanggan: async (req, res) => {
        const sql = "SELECT * FROM Pelanggan ORDER BY id_pelanggan DESC"; 

        try {
            const pelanggans = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            const formatPelanggan = pelanggans.map(pelanggan => ({
                id_pelanggan: pelanggan.id_pelanggan, 
                nama: pelanggan.nama, 
                alamat: pelanggan.alamat, 
                no_telepon: pelanggan.no_telepon, 
                email: pelanggan.email,
                tanggal_daftar: moment(pelanggan.tanggal_daftar).format('DD-MM-YYYY'),
            }))

            return res.status(200).json({
                status: true, 
                message: "sucess to get all pelanggan by kasir", 
                data: formatPelanggan
            })
        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    },
    getPelangganById: async (req, res) => {
        const sql = "SELECT * FROM Pelanggan WHERE id_pelanggan = ?"; 
        const id = req.params.id

        try {
            const pelanggans = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            const formatPelanggan = pelanggans.map(pelanggan => ({
                id_pelanggan: pelanggan.id_pelanggan, 
                nama: pelanggan.nama, 
                alamat: pelanggan.alamat, 
                no_telepon: pelanggan.no_telepon, 
                email: pelanggan.email,
                tanggal_daftar: moment(pelanggan.tanggal_daftar).format('DD-MM-YYYY'),
            }))

            return res.status(200).json({
                status: true, 
                message: "sucess to get all pelanggan by kasir", 
                data: formatPelanggan
            })
        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    },
}
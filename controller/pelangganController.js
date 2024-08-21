const connection = require('../config/db');
const moment = require('moment'); 

module.exports = {
    getAllPelanggan: async (req, res) => {
        const sql = "SELECT * FROM Pelanggan WHERE deleted_at IS NULL ORDER BY id_pelanggan DESC";

        try {
            const pelanggans = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            if (pelanggans.length === 0) {
                return res.status(404).json({
                    status: false, 
                    message: "Data with the specified ID is not found", 
                    data: pelanggans
                });
            }

            const formatPelanggan = pelanggans.map(pelanggan => ({
                id_pelanggan: pelanggan.id_pelanggan, 
                nama: pelanggan.nama, 
                alamat: pelanggan.alamat, 
                no_telepon: pelanggan.no_telepon, 
                email: pelanggan.email,
                tanggal_daftar: moment(pelanggan.tanggal_daftar).format('DD-MM-YYYY'),
                deleted_at: moment(pelanggan.deleted_at).format('DD-MM-YYYY'),
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
        const sql = "SELECT * FROM Pelanggan WHERE id_pelanggan = ? AND deleted_at IS NULL"; 
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

            if (pelanggans.length === 0) {
                return res.status(404).json({
                    status: false, 
                    message: "Data with the specified ID is not found", 
                    data: pelanggans
                });
            }

            const formatPelanggan = pelanggans.map(pelanggan => ({
                id_pelanggan: pelanggan.id_pelanggan, 
                nama: pelanggan.nama, 
                alamat: pelanggan.alamat, 
                no_telepon: pelanggan.no_telepon, 
                email: pelanggan.email,
                tanggal_daftar: moment(pelanggan.tanggal_daftar).format('DD-MM-YYYY'),
                deleted_at: moment(pelanggan.deleted_at).format('DD-MM-YYYY'),
            }))

            return res.status(200).json({
                status: true, 
                message: "sucess to get pelanggan by id", 
                data: formatPelanggan
            })
        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    },
    addPelanggan: async (req, res) => {
        const {nama, alamat, no_telepon, email} = req.body;
        const sql = "INSERT INTO Pelanggan (nama, alamat, no_telepon, email) VALUES (?, ?, ?, ?)";

        try {
            const pelanggans = await new Promise((resolve, reject) => {
                connection.query(sql, [nama, alamat, no_telepon, email], (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            return res.status(200).json({
                status: true, 
                message: "succes to add pelanggan", 
                data: pelanggans
            })

        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    },
    editPelanggan: async (req, res) => {
        const {nama, alamat, no_telepon, email} = req.body;
        const id = req.params.id;
        const sql = "UPDATE Pelanggan SET nama = ?, alamat = ?, no_telepon = ?, email = ? WHERE id_pelanggan = ?";

        try {
            const pelanggans = await new Promise((resolve, reject) => {
                connection.query(sql, [nama, alamat, no_telepon, email, id], (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            return res.status(200).json({
                status: true, 
                message: "succes to update pelanggan", 
                data: pelanggans
            })

        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    },
    deletePelanggan: async (req, res) => {
        const sql = "UPDATE Pelanggan SET deleted_at = NOW() WHERE id_pelanggan = ?";
        const id = req.params.id;

        try {
            const pelanggans = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            return res.status(200).json({
                status: true, 
                message: "succes to delete pelanggan", 
                data: pelanggans
            })

        } catch (error) {
            return res.status(500).json({
                message: 'internal server error', 
                error: error.message 
            });
        }
    },
    restorePelanggan: async (req, res) => {
        const sql = "UPDATE Pelanggan SET deleted_at = NULL WHERE id_pelanggan = ?";
        const id = req.params.id;

        try {
            const pelanggans = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            return res.status(200).json({
                status: true, 
                message: "succes to restore",
                data: pelanggans
            })

        } catch (error) {
            return res.status(500).json({
                message: 'internal server error', 
                error: error.message 
            });
        }
    }
}
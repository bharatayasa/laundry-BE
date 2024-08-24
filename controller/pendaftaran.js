const connection = require('../config/db');
const moment = require('moment'); 

module.exports = {
    getAllPendaftaran: async (req, res) => {
        const sql = `SELECT 
                        p.id_pendaftaran, 
                        p.id_pelanggan,
                        p.id_user,
                        p.tanggal_pendaftaran,
                        u.username,
                        l.nama
                    FROM 
                        Pendaftaran p
                    INNER JOIN 
                        User u ON p.id_user = u.id_user
                    INNER JOIN 
                        Pelanggan l ON p.id_pelanggan = l.id_pelanggan
                    WHERE 
                        p.deleted_at IS NULL
                    ORDER BY 
                        p.id_pendaftaran DESC;
                    ;`

        try {
            const pendaftarans = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            if (pendaftarans.length == 0) {
                return res.status(404).json({
                    message: "data not found", 
                    data: pendaftarans
                })
            }

            const formatPrndaftaran = pendaftarans.map(pendaftaran => ({
                id_pendaftaran: pendaftaran.id_pendaftaran, 
                id_pelanggan: pendaftaran.id_pelanggan,
                id_user: pendaftaran.id_user, 
                username: pendaftaran.username, 
                nama: pendaftaran.nama, 
                tanggal_pendaftaran: moment(pendaftaran.tanggal_pendaftaran).format('DD-MM-YYYY'),
            }))

            return res.status(200).json({
                status: true,
                message: "succes to get all pendaftaran data", 
                data: formatPrndaftaran
            })

        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    },
    getPendaftaranById: async (req, res) => {
        const id = req.params.id;
        const sql = `SELECT 
                        p.id_pendaftaran, 
                        p.id_pelanggan,
                        p.id_user,
                        p.tanggal_pendaftaran,
                        u.username,
                        l.nama
                    FROM 
                        Pendaftaran p
                    INNER JOIN 
                        User u ON p.id_user = u.id_user
                    INNER JOIN 
                        Pelanggan l ON p.id_pelanggan = l.id_pelanggan
                    WHERE 
                        p.id_pendaftaran = ?
                        AND p.deleted_at IS NULL
                    ORDER BY 
                        p.id_pendaftaran DESC;`;

        try {
            const pendaftarans = await new Promise((resolve, reject) => {
                connection.query(sql,id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            if (pendaftarans.length == 0) {
                return res.status(404).json({
                    message: "data not found", 
                    data: pendaftarans
                })
            }

            const formatPrndaftaran = pendaftarans.map(pendaftaran => ({
                id_pendaftaran: pendaftaran.id_pendaftaran, 
                id_pelanggan: pendaftaran.id_pelanggan,
                id_user: pendaftaran.id_user, 
                username: pendaftaran.username, 
                nama: pendaftaran.nama, 
                tanggal_pendaftaran: moment(pendaftaran.tanggal_pendaftaran).format('DD-MM-YYYY'),
            }))

            return res.status(200).json({
                status: true,
                message: "succes to get all pendaftaran data", 
                data: formatPrndaftaran
            })

        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    },
    addPendaftaran: async (req, res) => {
        const {id_pelanggan, id_user} = req.body;
        const sql = `INSERT INTO Pendaftaran (id_pelanggan, id_user) VALUES (?, ?)`;

        try {
            const pendaftarans = await new Promise((resolve, reject) => {
                connection.query(sql, [id_pelanggan, id_user], (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            if (pendaftarans.length == 0) {
                return res.status(404).json({
                    message: "data not found", 
                    data: pendaftarans
                })
            }

            return res.status(200).json({
                status: true,
                message: "succes to add pendaftaran data", 
                data: pendaftarans
            })

        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    },
    getUser: async (req, res) => {
        const sql = "SELECT * FROM User WHERE role = 'Kasir'";
    
        try {
            const pendaftarans = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
    
            if (pendaftarans.length === 0) {
                return res.status(404).json({
                    message: "data not found",
                    data: pendaftarans
                });
            }
    
            const formattedPendaftarans = pendaftarans.map(pendaftaran => ({
                id_user: pendaftaran.id_user, 
                username: pendaftaran.username
            }));
    
            return res.status(200).json({
                status: true,
                message: "success to get all User data",
                data: formattedPendaftarans
            });
    
        } catch (error) {
            return res.status(500).json({
                message: 'internal server error',
                error: error.message
            });
        }
    }, 
    updatePendaftaran: async (req, res) => {
        const id = req.params.id;
        const {id_pelanggan, id_user} = req.body;
        const sql = `UPDATE Pendaftaran SET id_pelanggan = ?, id_user = ? WHERE id_pendaftaran = ?`;

        try {
            const pendaftarans = await new Promise((resolve, reject) => {
                connection.query(sql, [id_pelanggan, id_user, id], (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(200).json({
                message: "success to edit pendaftaran", 
                data: pendaftarans
            })
        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    }, 
    deletePendaftaran: async (req, res) => {
        const id = req.params.id;
        const sql = `UPDATE Pendaftaran SET deleted_at = NOW() WHERE id_pendaftaran = ?`;

        try {
            const pendaftarans = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(200).json({
                message: "success to delete pendaftaran", 
                data: pendaftarans
            })
        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    }
}

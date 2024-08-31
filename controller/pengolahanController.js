const connection = require('../config/db');
const moment = require('moment'); 

module.exports = {
    getAllPengolahan: async (req, res) => {
        const sql = "SELECT * FROM Pengolahan ORDER BY id_pengolahan DESC"

        try {
            const pengolahans = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result)
                })
            })

            if (pengolahans.length == 0) {
                return res.status(404).json({
                    message: "data not found", 
                    data: pengolahans
                })
            }

            const formatPengolahan = pengolahans.map(pengolahan => ({
                id_pengolahan: pengolahan.id_pengolahan,
                id_pakaian: pengolahan.id_pakaian, 
                status_cuci: pengolahan.status_cuci, 
                status_kering: pengolahan.status_kering, 
                status_setrika: pengolahan.status_setrika, 
                tanggal_mulai: moment(pengolahan.tanggal_mulai).format('DD-MM-YYYY'),
                tanggal_selesai: moment(pengolahan.tanggal_selesai).format('DD-MM-YYYY'),
            }))

            return res.status(200).json({
                status: true, 
                message: "success to get all data", 
                data: formatPengolahan
            })
        } catch (error) {
            return res.status(500).json({
                message: 'internal server error',
                error: error.message
            });
        }
    },
    getPengolahanById: async (req, res) => {
        const id = req.params.id; 
        const sql = "SELECT * FROM Pengolahan WHERE id_pengolahan = ?"

        try {
            const pengolahans = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result)
                })
            })

            if (pengolahans.length == 0) {
                return res.status(404).json({
                    message: "data not found", 
                    data: pengolahans
                })
            }

            const formatPengolahan = pengolahans.map(pengolahan => ({
                id_pengolahan: pengolahan.id_pengolahan,
                id_pakaian: pengolahan.id_pakaian, 
                status_cuci: pengolahan.status_cuci, 
                status_kering: pengolahan.status_kering, 
                status_setrika: pengolahan.status_setrika, 
                tanggal_mulai: moment(pengolahan.tanggal_mulai).format('YYYY-MM-DD'),
                tanggal_selesai: moment(pengolahan.tanggal_selesai).format('YYYY-MM-DD'),
            }))

            return res.status(200).json({
                status: true, 
                message: "success to get all data", 
                data: formatPengolahan
            })

        } catch (error) {
            return res.status(500).json({
                message: 'internal server error',
                error: error.message
            });
        }
    },
    addPengolahan: async (req, res) => {
        const { id_pakaian, status_cuci, status_kering, status_setrika, tanggal_mulai, tanggal_selesai } = req.body;

        if (!id_pakaian || !status_cuci || !status_kering || !status_setrika || !tanggal_mulai || !tanggal_selesai) {
            return res.status(400).json({
                status: false,
                message: "Please provide all required fields"
            });
        }

        const sql = `
            INSERT INTO Pengolahan (id_pakaian, status_cuci, status_kering, status_setrika, tanggal_mulai, tanggal_selesai)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        try {
            const pengolahans = await new Promise((resolve, reject) => {
                connection.query(sql, [id_pakaian, status_cuci, status_kering, status_setrika, tanggal_mulai, tanggal_selesai], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });

            return res.status(201).json({
                status: true,
                message: "Data successfully added",
                data: pengolahans
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },
    updatePengolahan: async (req, res) => {
        const id = req.params.id; 
        const { id_pakaian, status_cuci, status_kering, status_setrika, tanggal_mulai, tanggal_selesai } = req.body;

        if (!id_pakaian || !status_cuci || !status_kering || !status_setrika || !tanggal_mulai || !tanggal_selesai) {
            return res.status(400).json({
                status: false,
                message: "Please provide all required fields"
            });
        }

        const sql = `
            UPDATE Pengolahan 
            SET id_pakaian = ?, status_cuci = ?, status_kering = ?, status_setrika = ?, tanggal_mulai = ?, tanggal_selesai = ? 
            WHERE id_pengolahan = ?
        `;

        try {
            const pengolahans = await new Promise((resolve, reject) => {
                connection.query(sql, [id_pakaian, status_cuci, status_kering, status_setrika, tanggal_mulai, tanggal_selesai, id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });

            if (pengolahans.affectedRows === 0) {
                return res.status(404).json({
                    status: false,
                    message: "Pengolahan not found"
                });
            }

            return res.status(200).json({
                status: true,
                message: "Data successfully updated",
                data: pengolahans
            });

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },
}

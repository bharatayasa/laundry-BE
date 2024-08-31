const connection = require('../config/db'); 
const moment = require('moment'); 

module.exports = {
    getAllPengiriman: async (req, res) => {
        const sql = `SELECT
                        p.id_pengiriman,
                        p.id_pengolahan,
                        p.id_user,
                        p.tanggal_pengiriman,
                        p.status_pengiriman,
                        l.id_pakaian, 
                        u.username
                    FROM 
                        Pengiriman p
                    INNER JOIN
                        Pengolahan l ON p.id_pengolahan = l.id_pengolahan
                    INNER JOIN 
                        User u ON p.id_user = u.id_user
                    WHERE 
                        p.deleted_at IS NULL
                    ORDER BY 
                        p.id_pengiriman DESC`;

        try {
            const pengirimans = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })

            if (pengirimans.length == 0) {
                return res.status(404).json({
                    status: true, 
                    message: "data not found", 
                    data: pengirimans
                })
            }

            const formatPengiriman = pengirimans.map(pengiriman => ({
                id_pengiriman: pengiriman.id_pengiriman, 
                id_pengolahan: pengiriman.id_pengolahan, 
                id_user: pengiriman.id_user, 
                tanggal_pengiriman: moment(pengiriman.tanggal_pengiriman).format('YYYY-MM-DD'),
                status_pengiriman: pengiriman.status_pengiriman,
                username: pengiriman.username,
                nama:pengiriman.nama
            }))

            return res.status(200).json({
                status: true, 
                message: "success to get pengiriman data", 
                data: formatPengiriman
            })
        } catch (error) {
            return res.status(500).json({
                message: 'internal server error',
                error: error.message
            });
        }
    },
    getPengirimanById: async (req, res) => {
        const id = req.params.id;
        const sql = "SELECT * FROM Pengiriman WHERE id_pengiriman = ?";

        try {
            const pengirimans = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })

            if (pengirimans.length == 0) {
                return res.status(404).json({
                    status: true, 
                    message: "data not found", 
                    data: pengirimans
                })
            }

            const formatPengiriman = pengirimans.map(pengiriman => ({
                id_pengiriman: pengiriman.id_pengiriman, 
                id_pengolahan: pengiriman.id_pengolahan, 
                id_user: pengiriman.id_user, 
                tanggal_pengiriman: moment(pengiriman.tanggal_pengiriman).format('YYYY-MM-DD'),
                status_pengiriman: pengiriman.status_pengiriman,
            }))

            return res.status(200).json({
                status: true, 
                message: "success to get pengiriman data", 
                data: formatPengiriman
            })
        } catch (error) {
            return res.status(500).json({
                message: 'internal server error',
                error: error.message
            });
        }
    },
    addPengiriman: async (req, res) => {
        const { id_pengolahan, id_user, tanggal_pengiriman, status_pengiriman } = req.body;
    
        if (!id_pengolahan || !id_user || !tanggal_pengiriman || !status_pengiriman) {
            return res.status(400).json({
                status: false,
                message: "Please provide all required fields"
            });
        }
    
        const sql = `
            INSERT INTO Pengiriman (id_pengolahan, id_user, tanggal_pengiriman, status_pengiriman)
            VALUES (?, ?, ?, ?)
        `;
    
        try {
            const result = await new Promise((resolve, reject) => {
                connection.query(sql, [id_pengolahan, id_user, tanggal_pengiriman, status_pengiriman], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
    
            return res.status(201).json({
                status: true,
                message: "Data successfully added",
                data: {
                    id_pengiriman: result.insertId,
                    id_pengolahan,
                    id_user,
                    tanggal_pengiriman,
                    status_pengiriman
                }
            });
    
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },
    updatePengiriman: async (req, res) => {
        const id = req.params.id;
        const { id_pengolahan, id_user, tanggal_pengiriman, status_pengiriman } = req.body;
    
        if (!id_pengolahan || !id_user || !tanggal_pengiriman || !status_pengiriman) {
            return res.status(400).json({
                status: false,
                message: "Please provide all required fields"
            });
        }
    
        const sql = `
            UPDATE Pengiriman 
            SET id_pengolahan = ?, id_user = ?, tanggal_pengiriman = ?, status_pengiriman = ?
            WHERE id_pengiriman = ?
        `;
    
        try {
            const result = await new Promise((resolve, reject) => {
                connection.query(sql, [id_pengolahan, id_user, tanggal_pengiriman, status_pengiriman, id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
    
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    status: false,
                    message: "Data not found"
                });
            }
    
            return res.status(200).json({
                status: true,
                message: "Data successfully updated",
                data: {
                    id_pengiriman: id,
                    id_pengolahan,
                    id_user,
                    tanggal_pengiriman,
                    status_pengiriman
                }
            });
    
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message
            });
        }
    },
    getKurirByKurir: async (req, res) => {
        const sql = "SELECT * FROM User WHERE role = 'Kurir'";

        try {
            const pengirimans = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            if (pengirimans.length == 0) {
                return res.status(404).json({
                    status: false, 
                    message: "data not found", 
                    data: pengirimans
                })
            }

            const formatKurir = pengirimans.map(kurir => ({
                id_user: kurir.id_user,
                username: kurir.username
            }))

            return res.status(200).json({
                status: true, 
                message: "success to get data kurir", 
                data: formatKurir
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message
            });
        }
    }, 
    deletePengiriman: async (req, res) => {
        const sql = "UPDATE Pengiriman SET deleted_at = NOW() WHERE id_pengiriman = ?"
        const id = req.params.id; 

        try {
            const pengirimans = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(200).json({
                status: true, 
                message: "sucess to delete data", 
                data: pengirimans
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message
            });
        }
    }
}

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
                tanggal_pengiriman: moment(pengiriman.tanggal_pengiriman).format('DD-MM-YYYY'),
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
    }
}

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
    }
}

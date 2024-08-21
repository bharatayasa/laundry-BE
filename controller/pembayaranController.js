const connection = require('../config/db');
const moment = require('moment'); 

module.exports = {
    getAllPembayaran: async (req, res) => {
        const sql = "SELECT * FROM Pembayaran";

        try {
            const pembayarans = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                })
            })

            if (pembayarans.length == 0) {
                return res.status(404).json({
                    status: false, 
                    message: "data not found", 
                    data: pembayarans
                })
            }

            return res.status(200).json({
                status: true, 
                message: "succes to get all data pembayaran", 
                data: pembayarans
            })
        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    }
}
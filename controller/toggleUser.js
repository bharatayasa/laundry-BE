const  connection = require('../config/db');

module.exports = {
    aktifUser: async (req, res) => {
        const sql = "UPDATE User SET deleted_at = NULL"

        try {
            const aktif = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })
    
            return res.status(200).json({
                message: "succes to active all user", 
                data: aktif
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },
    nonaktifUser: async (req, res) => {
        const sql = "UPDATE User SET deleted_at = NOW()"

        try {
            const nonaktif = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })
    
            return res.status(200).json({
                message: "succes to nonactive all user", 
                data: nonaktif
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error',
                error: error.message
            });
        }
    },
}
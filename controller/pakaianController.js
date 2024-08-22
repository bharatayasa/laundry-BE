const connection = require('../config/db');

module.exports = {
    getAllPakaian: async (req, res) => {
        const sql = `SELECT 
                        *
                    FROM Pakaian`;
    
        try {
            const pakaian = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })
    
            return res.status(200).json({
                message: "success to get data pakaian", 
                data: pakaian
            })
        } catch (error) {
            return res.status(500).json({
                message: "failed to get data pakaian", 
                error: error
            })
        }
    }
}

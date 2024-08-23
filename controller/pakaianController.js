const connection = require('../config/db');

module.exports = {
    getAllPakaian: async (req, res) => {
        const sql = `SELECT 
                        p.id_pakaian, 
                        p.id_pendaftaran,
                        p.jenis_pakaian,
                        p.jumlah,
                        p.berat,
                        n.nama
                    FROM
                        Pakaian p
                    INNER JOIN 
                        Pendaftaran d ON p.id_pendaftaran = d.id_pendaftaran
                    INNER JOIN 
                        Pelanggan n ON d.id_pelanggan = n.id_pelanggan
                    ORDER BY
                        p.id_pakaian DESC`;
        try {
            const pakaians = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
    
            const formatPakaian = pakaians.map(pakaian => ({
                id_pakaian: pakaian.id_pakaian, 
                nama: pakaian.nama,
                id_pendaftaran: pakaian.id_pendaftaran, 
                jenis_pakaian: pakaian.jenis_pakaian, 
                jumlah: pakaian.jumlah, 
                berat: pakaian.berat
            }));
        
            return res.status(200).json({
                status: true, 
                message: "Success to get data pakaian", 
                data: formatPakaian, 
            });
        } catch (error) {
            return res.status(500).json({
                message: "Failed to get data pakaian", 
                error: error
            });
        }
    },
    getPakaianById: async (req, res) => {
        const sql = `SELECT * FROM Pakaian WHERE id_pakaian = ? ORDER BY id_pakaian DESC`;
        const id = req.params.id; 
    
        try {
            const pakaians = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            const formatPakaian = pakaians.map(pakaian => ({
                id_pakaian: pakaian.id_pakaian, 
                id_pendaftaran: pakaian.id_pendaftaran, 
                jenis_pakaian: pakaian.jenis_pakaian, 
                jumlah: pakaian.jumlah, 
                berat: pakaian.berat
            }))
    
            return res.status(200).json({
                status: true, 
                message: "success to get data pakaian by id", 
                data: formatPakaian, 
            })
        } catch (error) {
            return res.status(500).json({
                message: "failed to get data pakaian by id", 
                error: error
            })
        }
    },
    addPakaian: async (req, res) => {
        const {id_pendaftaran, jenis_pakaian, jumlah, berat} = req.body;
        const sql = `INSERT INTO Pakaian (id_pendaftaran, jenis_pakaian, jumlah, berat) VALUES (?, ?, ?, ?)`;
    
        try {
            const pakaians = await new Promise((resolve, reject) => {
                connection.query(sql, [id_pendaftaran, jenis_pakaian, jumlah, berat], (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })

            return res.status(200).json({
                status: true, 
                message: "success to add pakaian", 
                data: pakaians, 
            })
        } catch (error) {
            return res.status(500).json({
                message: "failed add pakaian",
                error: error
            })
        }
    },
    editPakaian: async (req, res) => {
        const id = req.body.id;
        const {id_pendaftaran, jenis_pakaian, jumlah, berat} = req.body;
        const sql = `UPDATE Pakaian SET id_pendaftaran = ?, jenis_pakaian = ?, jumlah = ?, berat = ? WHERE id_pakaian = ?`;
    
        try {
            const pakaians = await new Promise((resolve, reject) => {
                connection.query(sql, [id_pendaftaran, jenis_pakaian, jumlah, berat, id], (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result)
                })
            })
    
            return res.status(200).json({
                status: true, 
                message: "success to update pakaian", 
                data: pakaians, 
            })
        } catch (error) {
            return res.status(500).json({
                message: "failed to update pakaian", 
                error: error
            })
        }
    }
}

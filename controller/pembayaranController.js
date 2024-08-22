const connection = require('../config/db');
const moment = require('moment'); 

const formatRupiah = (angka) => {
    if (typeof angka !== 'number') {
        angka = parseFloat(angka);
    }
    return angka.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
};

module.exports = {
    getAllPembayaran: async (req, res) => {
        const sql = `
                SELECT
                    b.id_pembayaran, 
                    b.id_pendaftaran,
                    b.id_user,
                    b.total_biaya,
                    b.tanggal_pembayaran,
                    b.status,
                    u.username,
                    p.tanggal_pendaftaran
                FROM
                    Pembayaran b
                INNER JOIN
                    Pendaftaran p ON b.id_pendaftaran = p.id_pendaftaran
                INNER JOIN 
                    User u ON b.id_user = u.id_user
                ORDER BY 
                    b.id_pembayaran DESC;
            `;

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

            const formatPembayaran = pembayarans.map(pembayaran => ({
                id_pembayaran: pembayaran.id_pembayaran,
                id_pendaftaran: pembayaran.id_pendaftaran,
                tanggal_pendaftaran: moment(pembayaran.tanggal_pendaftaran).format('DD-MM-YYYY'),
                username: pembayaran.username,
                total_biaya: formatRupiah(pembayaran.total_biaya),
                tanggal_pembayaran: moment(pembayaran.tanggal_pembayaran).format('DD-MM-YYYY'),
                status: pembayaran.status
            }))

            return res.status(200).json({
                status: true, 
                message: "succes to get all data pembayaran", 
                data: formatPembayaran
            })
        } catch (error) {
            return res.status(500).json({ 
                message: 'internal server error', 
                error: error.message 
            });
        }
    }
}
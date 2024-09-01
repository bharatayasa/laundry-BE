const connection = require('../config/db');
const moment = require('moment'); 

const formatRupiah = (angka) => {
    if (typeof angka !== 'number') {
        angka = parseFloat(angka);
    }
    return angka.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
};

module.exports = {
    getAllLaporan: async (req, res) => {
        const sql = `
            SELECT 
                l.id_laporan,
                l.id_user,
                l.id_pendaftaran,
                l.id_pembayaran, 
                l.id_pengolahan, 
                l.id_pengiriman,
                l.tanggal_laporan,
                l.keterangan,
                u.username,
                p.tanggal_pendaftaran,
                b.total_biaya,
                o.status_cuci,
                o.status_kering,
                o.status_setrika,
                k.status_pengiriman
            FROM
                Laporan l
            INNER JOIN 
                User u ON l.id_user = u.id_user
            INNER JOIN 
                Pendaftaran p ON l.id_pendaftaran = p.id_pendaftaran
            INNER JOIN
                Pembayaran b ON l.id_pembayaran = b.id_pembayaran
            INNER JOIN 
                Pengolahan o ON l.id_pengolahan = o.id_pengolahan
            INNER JOIN 
                Pengiriman k ON l.id_pengiriman = k.id_pengiriman
            WHERE 
                l.deleted_at IS NULL
            ORDER BY 
                l.id_laporan DESC;
        `;

        try {
            const laporans = await new Promise((resolve, reject) => {
                connection.query(sql, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            const formatLaporan = laporans.map(laporan => ({
                id_laporan: laporan.id_laporan,
                username: laporan.username,
                tanggal_laporan: moment(laporan.tanggal_laporan).format('DD-MM-YYYY'),
                keterangan: laporan.keterangan,
                tanggal_pendaftaran: moment(laporan.tanggal_pendaftaran).format('DD-MM-YYYY'),
                total_biaya: formatRupiah(laporan.total_biaya),
                status_cuci: laporan.status_cuci,
                status_kering: laporan.status_kering,
                status_setrika: laporan.status_setrika,
                status_pengiriman: laporan.status_pengiriman, 
            }));

            return res.status(200).json({
                status: true,
                message: "Success to get all laporan", 
                data: formatLaporan
            });

        } catch (error) {
            return res.status(500).json({ 
                message: 'Database error', 
                error: error.message 
            });
        }
    },
    getLaporanById: async (req, res) => {
        const id = req.params.id;
        const sql = `
            SELECT 
                l.id_laporan,
                l.id_user,
                l.id_pendaftaran,
                l.id_pembayaran, 
                l.id_pengolahan, 
                l.id_pengiriman,
                l.tanggal_laporan,
                l.keterangan,
                u.username,
                p.tanggal_pendaftaran,
                b.total_biaya,
                o.status_cuci,
                o.status_kering,
                o.status_setrika,
                k.status_pengiriman
            FROM
                Laporan l
            INNER JOIN 
                User u ON l.id_user = u.id_user
            INNER JOIN 
                Pendaftaran p ON l.id_pendaftaran = p.id_pendaftaran
            INNER JOIN
                Pembayaran b ON l.id_pembayaran = b.id_pembayaran
            INNER JOIN 
                Pengolahan o ON l.id_pengolahan = o.id_pengolahan
            INNER JOIN 
                Pengiriman k ON l.id_pengiriman = k.id_pengiriman
            WHERE 
                l.deleted_at IS NULL
            AND 
                l.id_laporan = ? 
            ORDER BY 
                l.id_laporan DESC;
        `;

        try {
            const laporans = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });

            const formatLaporan = laporans.map(laporan => ({
                id_laporan: laporan.id_laporan,
                username: laporan.username,
                tanggal_laporan: moment(laporan.tanggal_laporan).format('YYYY-MM-DD'),
                keterangan: laporan.keterangan,
                tanggal_pendaftaran: moment(laporan.tanggal_pendaftaran).format('YYYY-MM-DD'),
                total_biaya: formatRupiah(laporan.total_biaya),
                status_cuci: laporan.status_cuci,
                status_kering: laporan.status_kering,
                status_setrika: laporan.status_setrika,
                status_pengiriman: laporan.status_pengiriman, 
            }));

            return res.status(200).json({
                status: true,
                message: "Success to get all laporan", 
                data: formatLaporan
            });

        } catch (error) {
            return res.status(500).json({ 
                message: 'Database error', 
                error: error.message 
            });
        }
    },
    addLaporan: async (req, res) => {
        const { id_user, id_pendaftaran, id_pembayaran, id_pengolahan, id_pengiriman, tanggal_laporan, keterangan} = req.body;
    
        const sql = `INSERT INTO Laporan ( id_user, id_pendaftaran, id_pembayaran, id_pengolahan, id_pengiriman, tanggal_laporan, keterangan ) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    
        try {
            const laporans = await new Promise((resolve, reject) => {
                connection.query(sql, [ id_user, id_pendaftaran, id_pembayaran, id_pengolahan, id_pengiriman, tanggal_laporan, keterangan], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });
    
            return res.status(201).json({
                status: true,
                message: "Laporan berhasil ditambahkan",
                data: laporans
            });
    
        } catch (error) {
            return res.status(500).json({
                message: 'Database error',
                error: error.message
            });
        }
    },
    updateLaporan: async (req, res) => {
        const id = req.params.id; 
        const { id_user, id_pendaftaran, id_pembayaran, id_pengolahan, id_pengiriman, tanggal_laporan, keterangan } = req.body;
    
        const sql = `
            UPDATE Laporan SET  id_user = ?, id_pendaftaran = ?, id_pembayaran = ?, id_pengolahan = ?, id_pengiriman = ?, tanggal_laporan = ?, keterangan = ?WHERE id_laporan = ?;
        `;
    
        try {
            const laporans = await new Promise((resolve, reject) => {
                connection.query(sql, [ id_user, id_pendaftaran, id_pembayaran, id_pengolahan, id_pengiriman, tanggal_laporan, keterangan, id], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            });
    
            return res.status(200).json({
                status: true,
                message: "Laporan berhasil diperbarui",
                data: laporans
            });
    
        } catch (error) {
            return res.status(500).json({
                message: 'Database error',
                error: error.message
            });
        }
    },
    deleteLaporan: async (req, res) => {
        const sql = "UPDATE Laporan SET deleted_at = NOW() WHERE id_laporan = ?"
        const id = req.params.id

        try {
            const laporans = await new Promise((resolve, reject) => {
                connection.query(sql, id, (error, result) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(result);
                })
            })

            return res.status(200).json({
                status: true, 
                message: "success to delete data", 
                data: laporans
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Database error',
                error: error.message
            });
        }
    }
}

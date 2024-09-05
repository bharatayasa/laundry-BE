const connection = require('../config/db');
const moment = require('moment'); 
const PDFDocument = require('pdfkit');

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
    }, 
    cetakLaporanPDF: async (req, res) => {
        const { start_date, end_date } = req.query; // Use req.query for GET requests

        let sql = `
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
        `;

        if (start_date && end_date) {
            sql += ` AND l.tanggal_laporan BETWEEN '${start_date}' AND '${end_date}'`;
        }

        sql += ` ORDER BY l.id_laporan DESC;`;

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
                total_biaya: laporan.total_biaya,
                status_cuci: laporan.status_cuci,
                status_kering: laporan.status_kering,
                status_setrika: laporan.status_setrika,
                status_pengiriman: laporan.status_pengiriman
            }));

            // Membuat PDF
            const doc = new PDFDocument();
            let filename = `Laporan_${moment().format('YYYYMMDD_HHmmss')}.pdf`;
            filename = encodeURIComponent(filename);

            // Set response headers
            res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-type', 'application/pdf');

            // Isi PDF
            doc.fontSize(16).text("Laporan Transaksi", { align: 'center' });
            doc.moveDown();

            formatLaporan.forEach((laporan, index) => {
                doc.fontSize(12).text(`Laporan #${laporan.id_laporan}`);
                doc.text(`Username: ${laporan.username}`);
                doc.text(`Tanggal Laporan: ${laporan.tanggal_laporan}`);
                doc.text(`Keterangan: ${laporan.keterangan}`);
                doc.text(`Tanggal Pendaftaran: ${laporan.tanggal_pendaftaran}`);
                doc.text(`Total Biaya: ${laporan.total_biaya}`);
                doc.text(`Status Cuci: ${laporan.status_cuci}`);
                doc.text(`Status Kering: ${laporan.status_kering}`);
                doc.text(`Status Setrika: ${laporan.status_setrika}`);
                doc.text(`Status Pengiriman: ${laporan.status_pengiriman}`);
                doc.moveDown();
                doc.moveDown();
            });

            // Mengakhiri PDF dan mengirimnya ke response
            doc.pipe(res);
            doc.end();

        } catch (error) {
            return res.status(500).json({
                message: 'Database error',
                error: error.message
            });
        }
    }
}

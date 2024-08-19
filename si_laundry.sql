-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 101.128.64.219:3306
-- Waktu pembuatan: 19 Agu 2024 pada 06.43
-- Versi server: 10.11.5-MariaDB-log
-- Versi PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `si_laundry`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `Laporan`
--

CREATE TABLE `Laporan` (
  `id_laporan` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_pendaftaran` int(11) DEFAULT NULL,
  `id_pembayaran` int(11) DEFAULT NULL,
  `id_pengolahan` int(11) DEFAULT NULL,
  `id_pengiriman` int(11) DEFAULT NULL,
  `tanggal_laporan` date DEFAULT NULL,
  `keterangan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Laporan`
--

INSERT INTO `Laporan` (`id_laporan`, `id_user`, `id_pendaftaran`, `id_pembayaran`, `id_pengolahan`, `id_pengiriman`, `tanggal_laporan`, `keterangan`) VALUES
(1, 1, 1, 1, 1, 1, '2024-08-06', 'Laporan selesai untuk order Wayan Bharatayasa'),
(2, 1, 2, 2, 2, 2, '2024-08-07', 'Laporan dalam proses untuk order Made Sutrisna');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Pakaian`
--

CREATE TABLE `Pakaian` (
  `id_pakaian` int(11) NOT NULL,
  `id_pendaftaran` int(11) DEFAULT NULL,
  `jenis_pakaian` varchar(100) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `berat` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Pakaian`
--

INSERT INTO `Pakaian` (`id_pakaian`, `id_pendaftaran`, `jenis_pakaian`, `jumlah`, `berat`) VALUES
(1, 1, 'Kemeja', 3, 1.50),
(2, 2, 'Celana', 2, 1.00),
(3, 3, 'Jas', 1, 2.00);

-- --------------------------------------------------------

--
-- Struktur dari tabel `Pelanggan`
--

CREATE TABLE `Pelanggan` (
  `id_pelanggan` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `no_telepon` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tanggal_daftar` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Pelanggan`
--

INSERT INTO `Pelanggan` (`id_pelanggan`, `nama`, `alamat`, `no_telepon`, `email`, `tanggal_daftar`) VALUES
(1, 'Wayan Bharatayasa', 'Jl. Raya Kuta No.1, Bali', '081234567890', 'wayan@example.com', '2024-08-01'),
(2, 'Made Sutrisna', 'Jl. Diponegoro No.2, Denpasar', '081234567891', 'made@example.com', '2024-08-02'),
(3, 'Komang Putra', 'Jl. Sunset Road No.3, Kuta', '081234567892', 'komang@example.com', '2024-08-03');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Pembayaran`
--

CREATE TABLE `Pembayaran` (
  `id_pembayaran` int(11) NOT NULL,
  `id_pendaftaran` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `total_biaya` decimal(10,2) DEFAULT NULL,
  `tanggal_pembayaran` date DEFAULT NULL,
  `status` enum('Lunas','Belum Lunas') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Pembayaran`
--

INSERT INTO `Pembayaran` (`id_pembayaran`, `id_pendaftaran`, `id_user`, `total_biaya`, `tanggal_pembayaran`, `status`) VALUES
(1, 1, 2, 50000.00, '2024-08-05', 'Lunas'),
(2, 2, 2, 30000.00, '2024-08-06', 'Belum Lunas'),
(3, 3, 2, 70000.00, '2024-08-07', 'Lunas');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Pendaftaran`
--

CREATE TABLE `Pendaftaran` (
  `id_pendaftaran` int(11) NOT NULL,
  `id_pelanggan` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `tanggal_pendaftaran` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Pendaftaran`
--

INSERT INTO `Pendaftaran` (`id_pendaftaran`, `id_pelanggan`, `id_user`, `tanggal_pendaftaran`) VALUES
(1, 1, 2, '2024-08-05'),
(2, 2, 2, '2024-08-06'),
(3, 3, 2, '2024-08-07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Pengiriman`
--

CREATE TABLE `Pengiriman` (
  `id_pengiriman` int(11) NOT NULL,
  `id_pengolahan` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `tanggal_pengiriman` date DEFAULT NULL,
  `status_pengiriman` enum('Dalam Pengiriman','Diterima') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Pengiriman`
--

INSERT INTO `Pengiriman` (`id_pengiriman`, `id_pengolahan`, `id_user`, `tanggal_pengiriman`, `status_pengiriman`) VALUES
(1, 1, 4, '2024-08-06', 'Diterima'),
(2, 2, 4, '2024-08-07', 'Dalam Pengiriman');

-- --------------------------------------------------------

--
-- Struktur dari tabel `Pengolahan`
--

CREATE TABLE `Pengolahan` (
  `id_pengolahan` int(11) NOT NULL,
  `id_pakaian` int(11) DEFAULT NULL,
  `status_cuci` enum('Belum','Selesai') DEFAULT NULL,
  `status_kering` enum('Belum','Selesai') DEFAULT NULL,
  `status_setrika` enum('Belum','Selesai') DEFAULT NULL,
  `tanggal_mulai` date DEFAULT NULL,
  `tanggal_selesai` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Pengolahan`
--

INSERT INTO `Pengolahan` (`id_pengolahan`, `id_pakaian`, `status_cuci`, `status_kering`, `status_setrika`, `tanggal_mulai`, `tanggal_selesai`) VALUES
(1, 1, 'Selesai', 'Selesai', 'Selesai', '2024-08-05', '2024-08-06'),
(2, 2, 'Selesai', 'Selesai', 'Belum', '2024-08-06', NULL),
(3, 3, 'Selesai', 'Belum', 'Belum', '2024-08-07', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `User`
--

CREATE TABLE `User` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('Admin','Kasir','Pengolahan','Kurir') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `User`
--

INSERT INTO `User` (`id_user`, `username`, `password`, `role`) VALUES
(1, 'admin1', 'password123', 'Admin'),
(2, 'kasir1', 'password123', 'Kasir'),
(3, 'pengolahan1', 'password123', 'Pengolahan'),
(4, 'kurir1', 'password123', 'Kurir');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `Laporan`
--
ALTER TABLE `Laporan`
  ADD PRIMARY KEY (`id_laporan`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_pendaftaran` (`id_pendaftaran`),
  ADD KEY `id_pembayaran` (`id_pembayaran`),
  ADD KEY `id_pengolahan` (`id_pengolahan`),
  ADD KEY `id_pengiriman` (`id_pengiriman`);

--
-- Indeks untuk tabel `Pakaian`
--
ALTER TABLE `Pakaian`
  ADD PRIMARY KEY (`id_pakaian`),
  ADD KEY `id_pendaftaran` (`id_pendaftaran`);

--
-- Indeks untuk tabel `Pelanggan`
--
ALTER TABLE `Pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`);

--
-- Indeks untuk tabel `Pembayaran`
--
ALTER TABLE `Pembayaran`
  ADD PRIMARY KEY (`id_pembayaran`),
  ADD KEY `id_pendaftaran` (`id_pendaftaran`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `Pendaftaran`
--
ALTER TABLE `Pendaftaran`
  ADD PRIMARY KEY (`id_pendaftaran`),
  ADD KEY `id_pelanggan` (`id_pelanggan`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `Pengiriman`
--
ALTER TABLE `Pengiriman`
  ADD PRIMARY KEY (`id_pengiriman`),
  ADD KEY `id_pengolahan` (`id_pengolahan`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `Pengolahan`
--
ALTER TABLE `Pengolahan`
  ADD PRIMARY KEY (`id_pengolahan`),
  ADD KEY `id_pakaian` (`id_pakaian`);

--
-- Indeks untuk tabel `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `Laporan`
--
ALTER TABLE `Laporan`
  MODIFY `id_laporan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `Pakaian`
--
ALTER TABLE `Pakaian`
  MODIFY `id_pakaian` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `Pelanggan`
--
ALTER TABLE `Pelanggan`
  MODIFY `id_pelanggan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `Pembayaran`
--
ALTER TABLE `Pembayaran`
  MODIFY `id_pembayaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `Pendaftaran`
--
ALTER TABLE `Pendaftaran`
  MODIFY `id_pendaftaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `Pengiriman`
--
ALTER TABLE `Pengiriman`
  MODIFY `id_pengiriman` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `Pengolahan`
--
ALTER TABLE `Pengolahan`
  MODIFY `id_pengolahan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `User`
--
ALTER TABLE `User`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `Laporan`
--
ALTER TABLE `Laporan`
  ADD CONSTRAINT `Laporan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`),
  ADD CONSTRAINT `Laporan_ibfk_2` FOREIGN KEY (`id_pendaftaran`) REFERENCES `Pendaftaran` (`id_pendaftaran`),
  ADD CONSTRAINT `Laporan_ibfk_3` FOREIGN KEY (`id_pembayaran`) REFERENCES `Pembayaran` (`id_pembayaran`),
  ADD CONSTRAINT `Laporan_ibfk_4` FOREIGN KEY (`id_pengolahan`) REFERENCES `Pengolahan` (`id_pengolahan`),
  ADD CONSTRAINT `Laporan_ibfk_5` FOREIGN KEY (`id_pengiriman`) REFERENCES `Pengiriman` (`id_pengiriman`);

--
-- Ketidakleluasaan untuk tabel `Pakaian`
--
ALTER TABLE `Pakaian`
  ADD CONSTRAINT `Pakaian_ibfk_1` FOREIGN KEY (`id_pendaftaran`) REFERENCES `Pendaftaran` (`id_pendaftaran`);

--
-- Ketidakleluasaan untuk tabel `Pembayaran`
--
ALTER TABLE `Pembayaran`
  ADD CONSTRAINT `Pembayaran_ibfk_1` FOREIGN KEY (`id_pendaftaran`) REFERENCES `Pendaftaran` (`id_pendaftaran`),
  ADD CONSTRAINT `Pembayaran_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `Pendaftaran`
--
ALTER TABLE `Pendaftaran`
  ADD CONSTRAINT `Pendaftaran_ibfk_1` FOREIGN KEY (`id_pelanggan`) REFERENCES `Pelanggan` (`id_pelanggan`),
  ADD CONSTRAINT `Pendaftaran_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `Pengiriman`
--
ALTER TABLE `Pengiriman`
  ADD CONSTRAINT `Pengiriman_ibfk_1` FOREIGN KEY (`id_pengolahan`) REFERENCES `Pengolahan` (`id_pengolahan`),
  ADD CONSTRAINT `Pengiriman_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `Pengolahan`
--
ALTER TABLE `Pengolahan`
  ADD CONSTRAINT `Pengolahan_ibfk_1` FOREIGN KEY (`id_pakaian`) REFERENCES `Pakaian` (`id_pakaian`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

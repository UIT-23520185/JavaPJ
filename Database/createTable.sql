-- ----------------------------------CREATE DATABASE------------------
CREATE DATABASE HotelDB;
USE HotelDB;
-- DROP DATABASE HotelDB;


-- ----------------------------------CREATE TABLE----------------------
-- Tạo bảng VaiTro
CREATE TABLE VaiTro (
    MaVaiTro INT PRIMARY KEY,
    TenVaiTro NVARCHAR(50) NOT NULL
);
-- 0: Admin / 1: Khách hàng / 2: Lễ tân / 3: Kế toán / 4: Dọn phòng 

-- Tạo bảng NhanVien
CREATE TABLE NhanVien (
    MaNV INT PRIMARY KEY,
    HoTen NVARCHAR(100),
    NgaySinh DATE,
    GioiTinh NVARCHAR(10),
    DiaChi NVARCHAR(200),
    SoDienThoai NVARCHAR(20),
    Email NVARCHAR(100),
    MaVaiTro INT,
    FOREIGN KEY (MaVaiTro) REFERENCES VaiTro(MaVaiTro)
);

-- Tạo bảng KhachHang
CREATE TABLE KhachHang (
    MaKH INT PRIMARY KEY,
    HoTen NVARCHAR(100),
    DiaChi NVARCHAR(200),
    SoDienThoai NVARCHAR(20)
);

-- Tạo bảng NguoiDung
CREATE TABLE NguoiDung (
    MaND INT PRIMARY KEY AUTO_INCREMENT, -- tự động tăng
    Username NVARCHAR(50) UNIQUE NOT NULL, -- if MaNV != null then MaNV = Username
    Password NVARCHAR(100) NOT NULL,
    MaVaiTro INT,
    MaKH INT,  -- Khách hàng, nếu là khách hàng (có thể null)
    MaNV INT,  -- Nhân viên, nếu là nhân viên (có thể null)
    FOREIGN KEY (MaVaiTro) REFERENCES VaiTro(MaVaiTro),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);
-- Thêm ràng buộc để đảm bảo mỗi người dùng chỉ có 1 MaNV hoặc MaKH
ALTER TABLE NguoiDung
ADD CONSTRAINT chk_ma_nv_kh CHECK (
    (MaNV IS NOT NULL AND MaKH IS NULL) OR 
    (MaNV IS NULL AND MaKH IS NOT NULL)
);

-- Tạo bảng Phong
CREATE TABLE Phong (
    MaPhong INT PRIMARY KEY,
    SoNguoi INT,
    DonGia DECIMAL(10,2),
    TinhTrang ENUM('Trong', 'Da dat', 'Dang su dung')
);

-- Tạo bảng DichVu
CREATE TABLE DichVu (
    MaDV INT PRIMARY KEY,
    TenDV NVARCHAR(100),
    DonViTinh NVARCHAR(50),
    DonGia DECIMAL(10,2),
    TinhTrang ENUM('Dang cung cap', 'Tam ngung')
);

-- Tạo bảng PhieuDatPhong
CREATE TABLE PhieuDatPhong (
    MaPhieuDat INT PRIMARY KEY,
    MaKH INT,
    NgayNhan DATE,
    NgayTra DATE,
    TienCoc DECIMAL(10,2),
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH)
);

-- Tạo bảng ChiTietDatPhong
CREATE TABLE ChiTietDatPhong (
    MaPhieuDat INT,
    MaPhong INT,
    PRIMARY KEY (MaPhieuDat, MaPhong),
    FOREIGN KEY (MaPhieuDat) REFERENCES PhieuDatPhong(MaPhieuDat),
    FOREIGN KEY (MaPhong) REFERENCES Phong(MaPhong)
);

-- Tạo bảng HoaDon
CREATE TABLE HoaDon (
    MaHD INT PRIMARY KEY,
    MaPhieuDat INT,
    NgayThanhToan DATE,
    TongTien DECIMAL(10,2),
    MaNV INT,
    FOREIGN KEY (MaPhieuDat) REFERENCES PhieuDatPhong(MaPhieuDat),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);
-- Thêm MaNV để biết Nhân viên nào đã lập Hóa đơn

-- Tạo bảng ChiTietDichVu
CREATE TABLE ChiTietDichVu (
    MaHD INT,
    MaDV INT,
    SoLuong INT, -- Số lần sử dụng dịch vụ
    PRIMARY KEY (MaHD, MaDV),
    FOREIGN KEY (MaHD) REFERENCES HoaDon(MaHD),
    FOREIGN KEY (MaDV) REFERENCES DichVu(MaDV)
);

-- Tạo bảng PhieuDenBu
CREATE TABLE PhieuDenBu (
    MaPhieuDenBu INT PRIMARY KEY,
    MaKH INT,
    MaDV INT,
    MaPhong INT,
    NgayLap DATE,
    SoTien DECIMAL(10,2),
    MaNV INT,
    FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH),
    FOREIGN KEY (MaDV) REFERENCES DichVu(MaDV),
    FOREIGN KEY (MaPhong) REFERENCES Phong(MaPhong),
    FOREIGN KEY (MaNV) REFERENCES NhanVien(MaNV)
);
-- Thêm MaNV: Nhân viên đã lập Phiếu đền bù

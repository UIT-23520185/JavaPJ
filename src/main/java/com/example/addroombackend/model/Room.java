package com.example.addroombackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String tenPhong;

    private String moTa;

    @Column(nullable = false)
    private String trangThai;

    // Constructor không tham số
    public Room() {}

    public Room(String tenPhong, String moTa, String trangThai) {
        this.tenPhong = tenPhong;
        this.moTa = moTa;
        this.trangThai = trangThai;
    }

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTenPhong() { return tenPhong; }
    public void setTenPhong(String tenPhong) { this.tenPhong = tenPhong; }

    public String getMoTa() { return moTa; }
    public void setMoTa(String moTa) { this.moTa = moTa; }

    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
}
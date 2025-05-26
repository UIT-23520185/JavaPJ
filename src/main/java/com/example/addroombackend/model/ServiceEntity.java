package com.example.addroombackend.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "services")
public class ServiceEntity {

    @Id
    private String maDV;

    private String tenDV;
    private String moTa;
    private String donGia;


    // Constructor
    public ServiceEntity() {}

    // Getters and setters
    public String getMaDV() {
        return maDV;
    }

    public void setMaDV(String maDV) {
        this.maDV = maDV;
    }

    public String getTenDV() {
        return tenDV;
    }

    public void setTenDV(String tenDV) {
        this.tenDV = tenDV;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getDonGia() {
        return donGia;
    }

    public void setDonGia(String donGia) {
        this.donGia = donGia;
    }

}
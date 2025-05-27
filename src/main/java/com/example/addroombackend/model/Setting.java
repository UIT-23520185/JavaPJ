package com.example.addroombackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "settings")
public class Setting {
    @Id
    private Long id = 1L;  // Chỉ có 1 bản ghi duy nhất để lưu cài đặt

    private String hotelName;
    private String hotelAddress;
    private String hotelPhone;
    private String hotelEmail;

    // Constructor không tham số
    public Setting() {}

    // Getters và Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }  // <-- Thêm setter này

    public String getHotelName() { return hotelName; }
    public void setHotelName(String hotelName) { this.hotelName = hotelName; }

    public String getHotelAddress() { return hotelAddress; }
    public void setHotelAddress(String hotelAddress) { this.hotelAddress = hotelAddress; }

    public String getHotelPhone() { return hotelPhone; }
    public void setHotelPhone(String hotelPhone) { this.hotelPhone = hotelPhone; }

    public String getHotelEmail() { return hotelEmail; }
    public void setHotelEmail(String hotelEmail) { this.hotelEmail = hotelEmail; }
}
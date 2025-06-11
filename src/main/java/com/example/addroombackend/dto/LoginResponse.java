package com.example.addroombackend.dto;

public class LoginResponse {
    private String message;
    private boolean success;
    private Long id;

    public LoginResponse(String message, boolean success, Long id) {
        this.message = message;
        this.success = success;
        this.id = id;
    }

    // Getters
    public String getMessage() { return message; }
    public boolean isSuccess() { return success; }
    public Long getId() { return id; }
}
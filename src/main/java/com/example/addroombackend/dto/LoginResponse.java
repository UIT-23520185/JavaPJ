package com.example.addroombackend.dto;

public class LoginResponse {
    private String message;
    private boolean success;

    public LoginResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    // Getters
    public String getMessage() { return message; }
    public boolean isSuccess() { return success; }
}
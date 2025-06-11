package com.example.addroombackend.controller;

import com.example.addroombackend.dto.LoginRequest;
import com.example.addroombackend.dto.LoginResponse;
import com.example.addroombackend.model.User;
import com.example.addroombackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Cho phép frontend gọi API
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null) {
            return new LoginResponse("Email không tồn tại", false, user.getId());
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return new LoginResponse("Sai mật khẩu", false, user.getId());
        }

        return new LoginResponse("Đăng nhập thành công", true, user.getId());
    }
}
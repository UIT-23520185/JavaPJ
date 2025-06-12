package com.example.addroombackend.controller;

import com.example.addroombackend.dto.LoginRequest;
import com.example.addroombackend.dto.LoginResponse;
import com.example.addroombackend.model.User;
import com.example.addroombackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Cho phép frontend gọi API
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

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

    @PostMapping("/register")
    public LoginResponse register(@RequestBody User user) {
        // Kiểm tra email đã tồn tại chưa
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return new LoginResponse("Email đã tồn tại", false, null);
        }
        User savedUser = userRepository.save(user);
        return new LoginResponse("Đăng ký thành công", true, savedUser.getId());
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> payload) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        String currentPassword = payload.get("currentPassword");
        String newPassword = payload.get("newPassword");
        if (!user.getPassword().equals(currentPassword)) {
            return ResponseEntity.badRequest().body("Mật khẩu hiện tại không đúng");
        }
        user.setPassword(newPassword);
        userRepository.save(user);
        return ResponseEntity.ok("Đổi mật khẩu thành công");
    }
}
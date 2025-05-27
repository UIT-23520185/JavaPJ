package com.example.addroombackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "customers")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Tự động tăng

    private String name;
    private String phone;
    private String email;
    private String address;
}

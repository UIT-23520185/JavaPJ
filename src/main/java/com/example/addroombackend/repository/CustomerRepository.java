package com.example.addroombackend.repository;

import com.example.addroombackend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
package com.example.addroombackend.repository;

import com.example.addroombackend.model.ServiceEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<ServiceEntity, String> {
}
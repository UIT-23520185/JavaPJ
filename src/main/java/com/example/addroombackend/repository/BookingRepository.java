package com.example.addroombackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.addroombackend.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}

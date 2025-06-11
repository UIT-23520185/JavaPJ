package com.example.addroombackend.repository;

import com.example.addroombackend.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;


public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query("SELECT r FROM Room r WHERE r.id NOT IN (" +
            "SELECT b.idRoom FROM Booking b " +
            "WHERE (b.checkinDate < :checkoutDate AND b.checkoutDate > :checkinDate))")
    List<Room> findAvailableRooms(@Param("checkinDate") LocalDate checkinDate,
                                  @Param("checkoutDate") LocalDate checkoutDate);
}
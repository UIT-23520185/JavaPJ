package com.example.addroombackend.service;

import com.example.addroombackend.model.Room;
import java.util.List;

public interface IRoomService {
    List<Room> getAllRooms();
    Room getRoomById(Long id);
    Room addRoom(Room room);
    Room updateRoom(Long id, Room room);
    void deleteRoom(Long id);
}
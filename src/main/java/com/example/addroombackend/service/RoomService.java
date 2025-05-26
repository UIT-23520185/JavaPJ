package com.example.addroombackend.service;

import com.example.addroombackend.model.Room;
import com.example.addroombackend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService implements IRoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }
@Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Phòng không tồn tại với id: " + id));

    }
    @Override
        public Room updateRoom(Long id, Room updatedRoom) {
        return roomRepository.findById(id).map(room -> {
            room.setTenPhong(updatedRoom.getTenPhong());
            room.setMoTa(updatedRoom.getMoTa());
            room.setTrangThai(updatedRoom.getTrangThai());
            return roomRepository.save(room);
        }).orElseThrow(() -> new RuntimeException("Phòng không tồn tại với id: " + id));
    }
@Override
    public void deleteRoom(Long id) {
        if (!roomRepository.existsById(id)) {
            throw new RuntimeException("Phòng không tồn tại với id: " + id);
        }
        roomRepository.deleteById(id);
    }
}
package user_functions.service;

import user_functions.model.Booking;
import java.util.List;


public interface IBookingService {
    List<Booking> getAll();
    Booking getById(Long id);
    Booking create(Booking booking);
    Booking update(Long id, Booking booking);
    void delete(Long id);
}

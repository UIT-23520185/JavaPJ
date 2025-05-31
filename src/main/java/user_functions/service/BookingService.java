package user_functions.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import user_functions.repository.BookingRepository;
import user_functions.model.Booking;

import java.util.Optional;
import java.util.List;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @Override
    public Booking create(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public Booking update(Long id, Booking booking) {
        booking.setId(id);
        return bookingRepository.save(booking);
    }

    @Override
    public void delete(Long id) {
        bookingRepository.deleteById(id);
    }
}


package user_functions.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import user_functions.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}

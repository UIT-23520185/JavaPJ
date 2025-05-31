package user_functions.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_customer", nullable = false)
    private Long idCustomer;

    @Column(name = "checkin_date", nullable = false)
    private LocalDate checkinDate;

    @Column(name = "checkout_date", nullable = false)
    private LocalDate checkoutDate;

    @Column(nullable = false)
    private Double deposit;

    public Booking() {}

    public Booking(Long idCustomer, LocalDate checkinDate, LocalDate checkoutDate, Double deposit) {
        this.idCustomer = idCustomer;
        this.checkinDate = checkinDate;
        this.checkoutDate = checkoutDate;
        this.deposit = deposit;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(Long idCustomer) {
        this.idCustomer = idCustomer;
    }

    public LocalDate getCheckinDate() {
        return checkinDate;
    }

    public void setCheckinDate(LocalDate checkinDate) {
        this.checkinDate = checkinDate;
    }

    public LocalDate getCheckoutDate() {
        return checkoutDate;
    }

    public void setCheckoutDate(LocalDate checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public Double getDeposit() {
        return deposit;
    }

    public void setDeposit(Double deposit) {
        this.deposit = deposit;
    }
}


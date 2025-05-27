package com.example.addroombackend.service;

import com.example.addroombackend.model.Customer;


import java.util.List;
import java.util.Optional;

public interface ICustomerService {
    List<Customer> getAllCustomers();

    Customer addCustomer(Customer customer);

    Optional<Customer> getCustomerById(Long id);

    Customer updateCustomer(Long id, Customer customer);

    void deleteCustomer(Long id);
}
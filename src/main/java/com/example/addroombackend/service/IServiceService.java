package com.example.addroombackend.service;
import com.example.addroombackend.model.ServiceEntity;
import java.util.List;
import java.util.Optional;

public interface IServiceService {
    List<ServiceEntity> getAllServices();
    Optional<ServiceEntity> getServiceById(String maDV);
    ServiceEntity createService(ServiceEntity service);
    ServiceEntity updateService(String maDV, ServiceEntity updatedService);
    void deleteService(String maDV);
}
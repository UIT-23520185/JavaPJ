package com.example.addroombackend.service;

import com.example.addroombackend.model.ServiceEntity;
import com.example.addroombackend.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceService implements IServiceService {

    @Autowired
    private ServiceRepository repository;

    @Override
    public List<ServiceEntity> getAllServices() {
        return repository.findAll();
    }

    @Override
    public Optional<ServiceEntity> getServiceById(String id) {
        if (id == null) {
            return Optional.empty();
        }
        return repository.findById(id);
    }

    @Override
    public ServiceEntity createService(ServiceEntity service) {
        return repository.save(service);
    }

    @Override
    public ServiceEntity updateService(String maDV, ServiceEntity updatedService) {
        Optional<ServiceEntity> optional = repository.findById(maDV);
        if (!optional.isPresent()) {
            return null;
        }

        ServiceEntity existing = optional.get();
        existing.setTenDV(updatedService.getTenDV());
        existing.setMoTa(updatedService.getMoTa());
        existing.setDonGia(updatedService.getDonGia());

        return repository.save(existing);
    }

    @Override
    public void deleteService(String maDV) {
        repository.deleteById(maDV);
    }
}

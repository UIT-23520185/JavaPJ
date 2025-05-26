package com.example.addroombackend.controller;
import com.example.addroombackend.service.ServiceService;
import com.example.addroombackend.model.ServiceEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:3000") // Cho phép gọi API từ frontend (có thể chỉnh lại domain)
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    // Lấy danh sách dịch vụ
    @GetMapping
    public List<ServiceEntity> getAllServices() {
        return serviceService.getAllServices();
    }

    // Thêm dịch vụ mới
    @PostMapping
    public ResponseEntity<ServiceEntity> addService(@RequestBody ServiceEntity service) {
        if (serviceService.getServiceById(service.getMaDV()).isPresent()) {
            return ResponseEntity.badRequest().build(); // Mã đã tồn tại
        }
        ServiceEntity saved = serviceService.createService(service);
        return ResponseEntity.ok(saved);
    }

    // Cập nhật dịch vụ
    @PutMapping("/{maDV}")
    public ResponseEntity<ServiceEntity> updateService(@PathVariable String maDV, @RequestBody ServiceEntity service) {
        ServiceEntity updated = serviceService.updateService(maDV, service);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    // Xóa dịch vụ
    @DeleteMapping("/{maDV}")
    public ResponseEntity<Void> deleteService(@PathVariable String maDV) {
        if (!serviceService.getServiceById(maDV).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        serviceService.deleteService(maDV);
        return ResponseEntity.noContent().build();
    }
}

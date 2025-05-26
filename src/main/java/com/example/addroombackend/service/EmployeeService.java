package com.example.addroombackend.service;

import com.example.addroombackend.model.Employee;
import com.example.addroombackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService implements IEmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @Override
    public Employee addEmployee(Employee employee) {
        return repository.save(employee);
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        Optional<Employee> existing = repository.findById(id);
        if (existing.isPresent()) {
            Employee e = existing.get();
            e.setName(employee.getName());
            e.setPhone(employee.getPhone());
            e.setEmail(employee.getEmail());
            e.setPosition(employee.getPosition());
            return repository.save(e);
        } else {
            throw new RuntimeException("Employee not found with ID: " + id);
        }
    }

    @Override
    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
    @Override
    public Employee getEmployeeById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên với ID: " + id));
    }

}
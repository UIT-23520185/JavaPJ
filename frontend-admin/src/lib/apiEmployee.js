import axios from "axios";

const BASE_URL = "http://localhost:8080/api/employees";

// Lấy danh sách tất cả nhân viên
export const fetchEmployees = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    throw error;
  }
};

// Thêm nhân viên mới
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(BASE_URL, employeeData);
    return response.data;
  } catch (error) {
    console.error("Failed to add employee:", error);
    throw error;
  }
};

// Cập nhật thông tin nhân viên
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Failed to update employee:", error);
    throw error;
  }
};

// Xóa nhân viên theo ID
export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Failed to delete employee:", error);
    throw error;
  }
};

// Tìm nhân viên theo ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get employee by ID:", error);
    throw error;
  }
};
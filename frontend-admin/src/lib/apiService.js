
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/services";

export const fetchServices = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách dịch vụ:", error);
    throw error;
  }
};

export const addService = async (serviceData) => {
  try {
    const response = await axios.post(BASE_URL, serviceData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm dịch vụ:", error);
    throw error;
  }
};

export const updateService = async (maDV, serviceData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${maDV}`, serviceData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật dịch vụ:", error);
    throw error;
  }
};

export const deleteService = async (maDV) => {
  try {
    await axios.delete(`${BASE_URL}/${maDV}`);
  } catch (error) {
    console.error("Lỗi khi xóa dịch vụ:", error);
    throw error;
  }
};

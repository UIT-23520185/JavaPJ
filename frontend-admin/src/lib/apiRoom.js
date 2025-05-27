
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/rooms";

export const fetchRooms = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // trả về danh sách phòng
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
    throw error;
  }
};

export const addRoom = async (roomData) => {
  try {
    const response = await axios.post(BASE_URL, roomData);
    return response.data; // trả về phòng mới tạo
  } catch (error) {
    console.error("Failed to create room:", error);
    throw error;
  }
};

export const updateRoom = async (id, roomData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, roomData);
    return response.data; // trả về phòng đã cập nhật
  } catch (error) {
    console.error("Failed to update room:", error);
    throw error;
  }
};

export const deleteRoom = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Failed to delete room:", error);
    throw error;
  }
};
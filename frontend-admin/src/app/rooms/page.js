"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { fetchRooms, addRoom, updateRoom, deleteRoom } from "@/lib/apiRoom";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [deleteRoomData, setDeleteRoomData] = useState(null);
  const [editRoom, setEditRoom] = useState(null);
  const [newRoomData, setNewRoomData] = useState({
    tenPhong: "",
    moTa: "",
    trangThai: "",
  });

  // Load rooms từ backend
  const loadRooms = async () => {
    try {
      const data = await fetchRooms();
      setRoomList(data);
      setFilteredRooms([]);
    } catch (err) {
      toast.error(err.message || "Không thể tải danh sách phòng");
      console.error(err);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  // Tìm kiếm phòng
  const handleSearch = () => {
    if (searchQuery) {
      const filtered = roomList.filter((room) =>
        room.tenPhong.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.trangThai.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.id.toString() === searchQuery
      );
      if (filtered.length < 1) toast.error("Không tìm thấy kết quả");
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms([]);
    }
  };

  // Mở popup thêm phòng mới
  const handleAddRoom = () => {
    setEditRoom(null);
    setNewRoomData({
      tenPhong: "",
      moTa: "",
      trangThai: "",
    });
    setPopUpOpen(true);
  };

  // Mở popup chỉnh sửa phòng
  const handleEdit = (room) => {
    setEditRoom(room);
    setNewRoomData({
      tenPhong: room.tenPhong,
      moTa: room.moTa,
      trangThai: room.trangThai,
    });
    setPopUpOpen(true);
  };

  // Lưu thay đổi (thêm hoặc sửa)
  const handleSaveEdit = async () => {
    if (!newRoomData.tenPhong || !newRoomData.trangThai) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      if (editRoom) {
        await updateRoom(editRoom.id, newRoomData);
        toast.success("Cập nhật phòng thành công");
      } else {
        await addRoom(newRoomData);
        toast.success("Thêm phòng thành công");
      }
      setPopUpOpen(false);
      setEditRoom(null);
      loadRooms();
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra");
      console.error(err);
    }
  };

  // Xóa phòng
  const handleDelete = async (room) => {
    try {
      await deleteRoom(room.id);
      toast.success("Xóa phòng thành công");
      setDeleteRoomData(null);
      setPopUpOpen(false);
      loadRooms();
    } catch (err) {
      toast.error(err.message || "Không thể xóa phòng");
      console.error(err);
    }
  };

  const RoomCard = ({ room }) => (
    <div className="flex bg-white w-full rounded-lg mt-2 relative drop-shadow-lg p-4 gap-6 items-center">
      {/* Nếu có hình ảnh, bạn có thể thêm phần hiển thị hình ảnh ở đây */}
      {/* Ví dụ: */}
      {/* <img src={room.hinhAnh?.[0]} className="w-[180px] h-[120px] object-cover rounded-lg" /> */}

      <div className="flex flex-col gap-2 relative w-full">
        <p>ID: {room.id}</p>
        <p className="font-bold text-lg">{room.tenPhong}</p>
        <p className="italic">{room.moTa}</p>
        <p className={`font-semibold ${room.trangThai === "Sẵn sàng" ? "text-green-600" : "text-red-600"}`}>
          Trạng thái: {room.trangThai}
        </p>
        <div className="flex justify-end gap-4">
          <Button className="w-24 h-10 bg-[#062D76] hover:bg-gray-700" onClick={() => handleEdit(room)}>
            <Pencil className="w-5 h-5" color="white" />
            <p className="ml-2 hidden md:block">Sửa</p>
          </Button>
          <Button
            className="w-24 h-10 bg-[#D66766] hover:bg-gray-700"
            onClick={() => {
              setDeleteRoomData(room);
              setPopUpOpen(true);
            }}
          >
            <Trash2 className="w-5 h-5" color="white" />
            <p className="ml-2 hidden md:block">Xóa</p>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-row w-full h-full bg-[#EFF3FB]">
      <Sidebar />
      <div className="flex w-full flex-col py-6 md:ml-52 relative mt-5 gap-4 items-center px-10">
        <div className="flex w-full items-center justify-between mb-6">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Tìm kiếm phòng"
              className="w-64 md:w-96 h-10 text-black bg-white rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="w-10 h-10 bg-[#062D76] hover:bg-gray-700" onClick={handleSearch}>
              <Search className="w-6 h-6" color="white" />
            </Button>
          </div>
          <Button className="w-36 h-10 bg-[#062D76] hover:bg-gray-700" onClick={handleAddRoom}>
            <Plus className="w-5 h-5" color="white" />
            <p className="ml-2">Thêm phòng</p>
          </Button>
        </div>

        {(filteredRooms.length > 0 ? filteredRooms : roomList).map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}

        {popUpOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full h-full bg-black opacity-50 absolute"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
              <h2 className="text-lg font-bold mb-4">
                {editRoom ? "Chỉnh sửa phòng" : deleteRoomData ? "Xác nhận xóa" : "Thêm phòng mới"}
              </h2>

              {deleteRoomData ? (
                <>
                  <p>Bạn có chắc chắn muốn xóa phòng này không?</p>
                  <div className="flex bg-white w-full rounded-lg mt-4 p-4 items-center">
                    {/* <img src={deleteRoomData.hinhAnh?.[0]} className="w-40 h-28 object-cover rounded-lg" /> */}
                    <div className="ml-4">
                      <p>ID: {deleteRoomData.id}</p>
                      <p className="font-bold">{deleteRoomData.tenPhong}</p>
                      <p className="italic">{deleteRoomData.moTa}</p>
                      <p className="font-semibold">Trạng thái: {deleteRoomData.trangThai}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 gap-4">
                    <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setPopUpOpen(false)}>
                      Hủy
                    </Button>
                    <Button className="bg-red-500 hover:bg-red-700" onClick={() => handleDelete(deleteRoomData)}>
                      Xóa
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Input
                    type="text"
                    placeholder="Tên phòng"
                    className="mb-4"
                    value={newRoomData.tenPhong}
                    onChange={(e) => setNewRoomData({ ...newRoomData, tenPhong: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder="Mô tả"
                    className="mb-4"
                    value={newRoomData.moTa}
                    onChange={(e) => setNewRoomData({ ...newRoomData, moTa: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder="Trạng thái"
                    className="mb-4"
                    value={newRoomData.trangThai}
                    onChange={(e) => setNewRoomData({ ...newRoomData, trangThai: e.target.value })}
                  />
                  <div className="flex justify-end gap-4">
                    <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setPopUpOpen(false)}>
                      Hủy
                    </Button>
                    <Button className="bg-[#062D76] hover:bg-gray-700" onClick={handleSaveEdit}>
                      Lưu
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

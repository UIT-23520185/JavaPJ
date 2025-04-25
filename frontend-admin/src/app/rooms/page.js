"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [deleteRoom, setDeleteRoom] = useState(null);
  const [editRoom, setEditRoom] = useState(null);
  const [newRoomData, setNewRoomData] = useState({
    MaPhong: "",
    TenPhong: "",
    MoTa: "",
    TrangThai: "",
  });

  const handleSearch = () => {
    if (searchQuery) {
      const filtered = roomList.filter((room) =>
        room.MaPhong.toString() === searchQuery ||
        room.TenPhong.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.TrangThai.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length < 1) toast.error("Không tìm thấy kết quả");
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms([]);
    }
  };

  const handleAddRoom = () => {
    setEditRoom(null); // reset edit state
    setNewRoomData({
      MaPhong: "",
      TenPhong: "",
      MoTa: "",
      TrangThai: "",
    });
    setPopUpOpen(true);
  };

  const handleEdit = (room) => {
    setEditRoom(room);
    setNewRoomData({
      MaPhong: room.MaPhong,
      TenPhong: room.TenPhong,
      MoTa: room.MoTa,
      TrangThai: room.TrangThai,
    });
    setPopUpOpen(true);
  };

  const handleSaveEdit = () => {
    if (!newRoomData.TenPhong || !newRoomData.TrangThai) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (editRoom) {
      // cập nhật phòng đã có
      const updated = roomList.map((room) =>
        room.MaPhong === editRoom.MaPhong ? { ...editRoom, ...newRoomData } : room
      );
      setRoomList(updated);
      toast.success("Cập nhật phòng thành công");
    } else {
      // thêm mới phòng
      const newRoom = {
        ...newRoomData,
        MaPhong: `P${(roomList.length + 1).toString().padStart(3, "0")}`,
        HinhAnh: ["/room/room_default.jpg"],
      };
      setRoomList([...roomList, newRoom]);
      toast.success("Thêm phòng thành công");
    }

    setPopUpOpen(false);
    setEditRoom(null);
  };

  const fetchRooms = async () => {
    const rooms = [
      {
        MaPhong: "P001",
        TenPhong: "Phòng 101",
        MoTa: "Phòng đơn, giường lớn, view đẹp",
        TrangThai: "Sẵn sàng",
        HinhAnh: ["/room/room1.jpg"],
      },
      {
        MaPhong: "P002",
        TenPhong: "Phòng 202",
        MoTa: "Phòng đôi, tiện nghi đầy đủ",
        TrangThai: "Đã đặt",
        HinhAnh: ["/room/room2.jpg"],
      },
      {
        MaPhong: "P003",
        TenPhong: "Phòng 303",
        MoTa: "Phòng vip, bể bơi riêng",
        TrangThai: "Đang bảo trì",
        HinhAnh: ["/room/room3.jpg"],
      },
    ];
    setRoomList(rooms);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (room) => {
    const updated = roomList.filter((r) => r.MaPhong !== room.MaPhong);
    setRoomList(updated);
    setDeleteRoom(null);
    setPopUpOpen(false);
    toast.success("Xóa phòng thành công");
  };

  const RoomCard = ({ room }) => {
    return (
      <div className="flex bg-white w-full rounded-lg mt-2 relative drop-shadow-lg p-4 gap-6 items-center">
        <img src={`${room.HinhAnh[0]}`} className="w-[180px] h-[120px] object-cover rounded-lg" />
        <div className="flex flex-col gap-2 relative w-full">
          <p>ID:&nbsp;{room.MaPhong}</p>
          <p className="font-bold text-lg">{room.TenPhong}</p>
          <p className="italic">{room.MoTa}</p>
          <p className={`font-semibold ${room.TrangThai === "Sẵn sàng" ? "text-green-600" : "text-red-600"}`}>
            Trạng thái: {room.TrangThai}
          </p>
          <div className="flex justify-end gap-4">
            <Button className="w-24 h-10 bg-[#062D76] hover:bg-gray-700" onClick={() => handleEdit(room)}>
              <Pencil className="w-5 h-5" color="white" />
              <p className="ml-2 hidden md:block">Sửa</p>
            </Button>
            <Button className="w-24 h-10 bg-[#D66766] hover:bg-gray-700" onClick={() => {
              setDeleteRoom(room);
              setPopUpOpen(true);
            }}>
              <Trash2 className="w-5 h-5" color="white" />
              <p className="ml-2 hidden md:block">Xóa</p>
            </Button>
          </div>
        </div>
      </div>
    );
  };

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
          <RoomCard key={room.MaPhong} room={room} />
        ))}

        {popUpOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full h-full bg-black opacity-50 absolute"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
              <h2 className="text-lg font-bold mb-4">
                {editRoom ? "Chỉnh sửa phòng" : deleteRoom ? "Xác nhận xóa" : "Thêm phòng mới"}
              </h2>

              {deleteRoom ? (
                <>
                  <p>Bạn có chắc chắn muốn xóa phòng này không?</p>
                  <div className="flex bg-white w-full rounded-lg mt-4 p-4 items-center">
                    <img src={`${deleteRoom.HinhAnh[0]}`} className="w-40 h-28 object-cover rounded-lg" />
                    <div className="ml-4">
                      <p>ID: {deleteRoom.MaPhong}</p>
                      <p className="font-bold">{deleteRoom.TenPhong}</p>
                      <p className="italic">{deleteRoom.MoTa}</p>
                      <p className="font-semibold">Trạng thái: {deleteRoom.TrangThai}</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 gap-4">
                    <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setPopUpOpen(false)}>Hủy</Button>
                    <Button className="bg-red-500 hover:bg-red-700" onClick={() => handleDelete(deleteRoom)}>Xóa</Button>
                  </div>
                </>
              ) : (
                <>
                  <Input
                    type="text"
                    placeholder="Tên phòng"
                    className="mb-4"
                    value={newRoomData.TenPhong}
                    onChange={(e) => setNewRoomData({ ...newRoomData, TenPhong: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder="Mô tả"
                    className="mb-4"
                    value={newRoomData.MoTa}
                    onChange={(e) => setNewRoomData({ ...newRoomData, MoTa: e.target.value })}
                  />
                  <Input
                    type="text"
                    placeholder="Trạng thái"
                    className="mb-4"
                    value={newRoomData.TrangThai}
                    onChange={(e) => setNewRoomData({ ...newRoomData, TrangThai: e.target.value })}
                  />
                  <div className="flex justify-end mt-4 gap-4">
                    <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setPopUpOpen(false)}>Hủy</Button>
                    <Button className="bg-blue-500 hover:bg-blue-700" onClick={handleSaveEdit}>
                      {editRoom ? "Lưu" : "Thêm"}
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

export default page;

'use client';  // Đảm bảo đây là client component

import React, { useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { Button } from "/src/components/ui/button.jsx";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

const page = () => {
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "+84 123 456 789",
    address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
    joinDate: "01/01/2022",
  });

  // Hàm chỉnh sửa thông tin
  const handleEditCustomer = () => {
    setEditingCustomer(true);
  };

  // Lưu thay đổi thông tin
  const handleSaveEdit = () => {
    setEditingCustomer(false);
    // Đây là nơi bạn sẽ cập nhật thông tin người dùng vào database hoặc state
    toast.success("Thông tin đã được lưu thành công.");
  };

  return (
    <div className="flex-1 items-center justify-center p-8 pl-[220px]">
      <LeftSideBar />
      <div className="flex-1 p-8 pt-20">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
          Thông Tin Cá Nhân
        </h1>

        {/* Hiển thị thông tin người dùng */}
        <div className="max-w-lg mx-auto p-6 bg-white border-2 border-blue-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Thông Tin Cơ Bản</h2>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium text-lg">Họ và Tên:</p>
              <p className="text-gray-600">{newUserData.name}</p>
            </div>

            <div>
              <p className="font-medium text-lg">Email:</p>
              <p className="text-gray-600">{newUserData.email}</p>
            </div>

            <div>
              <p className="font-medium text-lg">Số điện thoại:</p>
              <p className="text-gray-600">{newUserData.phone}</p>
            </div>

            <div>
              <p className="font-medium text-lg">Địa chỉ:</p>
              <p className="text-gray-600">{newUserData.address}</p>
            </div>

            <div>
              <p className="font-medium text-lg">Ngày tham gia:</p>
              <p className="text-gray-600">{newUserData.joinDate}</p>
            </div>
          </div>

          {/* Nút chỉnh sửa thông tin */}
          <div className="mt-6 flex justify-end">
            <Button
              className="bg-[#062D76] text-white px-6 py-2 rounded-md hover:bg-gray-700 flex items-center"
              onClick={handleEditCustomer}
            >
              <Pencil className="w-5 h-5 mr-2" />
              Chỉnh sửa
            </Button>
          </div>

          {/* Pop-up chỉnh sửa thông tin */}
          {editingCustomer && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="w-full h-full bg-black opacity-50 absolute"></div>
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
                <h2 className="text-lg font-bold mb-4">Chỉnh sửa thông tin cá nhân</h2>
                <div className="grid grid-cols-1 gap-4">
                  {["name", "phone", "email", "address"].map((field) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      placeholder={`Nhập ${field}`}
                      value={newUserData[field]}
                      onChange={(e) => setNewUserData({ ...newUserData, [field]: e.target.value })}
                      className="p-3 border border-[#062D76] rounded-lg focus:ring-2 focus:ring-[#062D76]"
                    />
                  ))}
                </div>
                <div className="flex justify-end mt-4 gap-4">
                  <Button
                    className="bg-gray-500 hover:bg-gray-700"
                    onClick={() => setEditingCustomer(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    className="bg-[#062D76] hover:bg-gray-700"
                    onClick={handleSaveEdit}
                  >
                    Lưu
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;

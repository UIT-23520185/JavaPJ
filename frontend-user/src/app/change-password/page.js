"use client";

import React, { useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "../components/ui/button";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id || "");
    }
  }, []);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận không khớp");
      return;
    }

    try {
      if (!userId) {
        alert("Không tìm thấy thông tin người dùng");
        return;
      }
      // Gửi request đổi mật khẩu
      await axios.put(`http://localhost:8080/api/users/${userId}/change-password`, {
        currentPassword,
        newPassword
      });
      alert("Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      alert("Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu hiện tại.");
    }
  };

  return (
    <div className="flex min-h-screen mt-15">
      <LeftSideBar />
      <div className="flex-1 flex justify-center items-start p-4">
        <div className="w-full max-w-md bg-white border border-[#1E3A8A] shadow-md rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Đổi Mật Khẩu</h2>
          <input
            type="password"
            placeholder="Mật khẩu hiện tại"
            className="w-full p-2 border rounded-md"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="w-full p-2 border rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            className="w-full p-2 border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            onClick={handleChangePassword}
            className="w-full bg-[#1E3A8A] text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

"use client";

import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "../components/ui/button";

const PaymentPage = () => {
  const contract = {
    contractId: "HD001",
    customerId: "KH001",
    customerName: "Nguyễn Văn A",
    roomId: "P001",
    startDate: "01/04/2025",
    endDate: "01/04/2026",
    status: "Hiệu lực",
    services: [
      { name: "Giặt ủi", price: 50000 },
      { name: "Ăn sáng", price: 100000 },
    ],
  };

  const total = contract.services.reduce((sum, service) => sum + service.price, 0);

  const handlePayment = () => {
    toast.success("Thanh toán thành công!");
  };

  return (
    <div className="flex mt-12 min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <LeftSideBar />
      <div className="flex-1 p-6 flex justify-center items-start">
        <div className="w-full max-w-lg bg-white border border-[#1E3A8A] rounded-xl shadow-lg p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center">Hóa Đơn Thanh Toán</h1>

          <div className="space-y-1 text-sm">
            <p><strong>Mã hợp đồng:</strong> {contract.contractId}</p>
            <p><strong>Khách hàng:</strong> {contract.customerName} ({contract.customerId})</p>
            <p><strong>Phòng:</strong> {contract.roomId}</p>
            <p><strong>Thời gian:</strong> {contract.startDate} - {contract.endDate}</p>
            <p><strong>Trạng thái:</strong> {contract.status}</p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Dịch vụ sử dụng:</h2>
            <ul className="space-y-1 text-sm">
              {contract.services.map((service, idx) => (
                <li key={idx} className="flex justify-between border-b pb-1">
                  <span>{service.name}</span>
                  <span>{service.price.toLocaleString()} đ</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-right font-bold text-lg">
            Tổng cộng: {total.toLocaleString()} đ
          </div>

          <Button
            onClick={handlePayment}
            className="w-full bg-[#1E3A8A] text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Thanh Toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

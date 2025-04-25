"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const RevenuePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    const fakeTransactions = [
      { id: 1, customer: "Nguyễn Văn A", room: "Phòng 101", amount: 1500000, date: "2025-01-01" },
      { id: 2, customer: "Trần Thị B", room: "Phòng 202", amount: 2000000, date: "2025-01-05" },
      { id: 3, customer: "Lê Văn C", room: "Phòng 303", amount: 2500000, date: "2025-03-10" },
      { id: 4, customer: "Phạm Văn D", room: "Phòng 404", amount: 1800000, date: "2025-04-12" },
      { id: 5, customer: "Ngô Thị E", room: "Phòng 505", amount: 2100000, date: "2025-07-20" },
      { id: 6, customer: "Đỗ Văn F", room: "Phòng 606", amount: 2400000, date: "2025-10-15" },
    ];

    setTransactions(fakeTransactions);
    setTotalRevenue(fakeTransactions.reduce((sum, tx) => sum + tx.amount, 0));

    // Nhóm doanh thu theo tháng
    const revenueByMonth = fakeTransactions.reduce((acc, tx) => {
      const month = new Date(tx.date).toLocaleString("vi-VN", { month: "short" });
      acc[month] = (acc[month] || 0) + tx.amount;
      return acc;
    }, {});

    // Chuyển đổi thành mảng cho biểu đồ
    const monthlyRevenueData = Object.keys(revenueByMonth).map((month) => ({
      month,
      revenue: revenueByMonth[month],
    }));

    setMonthlyRevenue(monthlyRevenueData);
  };

  return (
    <div className="flex w-full h-screen bg-[#F4F7FE] overflow-hidden">
      <Sidebar className="w-64 min-w-[250px] h-full flex-shrink-0" />

      <div className="flex flex-col flex-1 p-6 overflow-auto ml-55">
        <h1 className="text-2xl font-bold mb-6">Báo cáo doanh thu</h1>

        <Card className="p-4 mb-6 w-full">
          <CardContent>
            <h2 className="text-lg font-semibold">Tổng doanh thu</h2>
            <p className="text-2xl text-blue-600 font-bold">
              {totalRevenue.toLocaleString("vi-VN")} VND
            </p>
          </CardContent>
        </Card>

        <Card className="p-4 mb-6 w-full ">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Doanh thu theo tháng</h2>
            <div className="w-full max-w-full flex justify-center overflow-hidden">
              <ResponsiveContainer width="90%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <XAxis dataKey="month" stroke="#8884d8" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#82ca9d" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 w-full">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Lịch sử giao dịch</h2>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#062D76]  text-white">
                    <th className="p-2 text-left">Khách hàng</th>
                    <th className="p-2 text-left">Phòng</th>
                    <th className="p-2 text-left">Số tiền</th>
                    <th className="p-2 text-left">Ngày đặt phòng</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-t">
                      <td className="p-2">{tx.customer}</td>
                      <td className="p-2">{tx.room}</td>
                      <td className="p-2 text-left">{tx.amount.toLocaleString("vi-VN")} VND</td>
                      <td className="p-2 text-left">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenuePage;

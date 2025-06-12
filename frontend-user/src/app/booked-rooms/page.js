'use client';
import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { Card, CardContent, CardHeader } from "/src/components/ui/card";
import { User, CalendarCheck, CalendarX } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";

const BookedRoomsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setBookings([]);
          setLoading(false);
          return;
        }
        // Lấy tất cả bookings từ API
        const [bookingsRes, roomsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/bookings"),
          axios.get("http://localhost:8080/api/rooms"),
        ]);
        // Map idRoom -> roomName, roomImage
        const roomsMap = {};
        roomsRes.data.forEach((room) => {
          roomsMap[room.id] = room;
        });
        // Lọc và enrich bookings
        const filtered = bookingsRes.data
          .filter((b) => String(b.idCustomer) === String(userId))
          .map((b) => ({
            ...b,
            roomName: roomsMap[b.idRoom]?.tenPhong || "Phòng",
            // Không lấy roomImage vì không có trường image trong Room, dùng ảnh mặc định
          }));
        setBookings(filtered);
      } catch (error) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="flex min-h-screen">
      <LeftSideBar />
      <div className="flex-1 p-5 ml-55 mt-13">
        <h1 className="text-2xl text-[#1E3A8A] font-bold mb-6">
          Danh sách phòng đã đặt
        </h1>
        {loading ? (
          <div>Đang tải dữ liệu...</div>
        ) : bookings.length === 0 ? (
          <div>Bạn chưa có phòng nào đã đặt.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="rounded-2xl shadow-md">
                <CardHeader className="p-0">
                  <img
                    src={booking.roomImage || "/room/room1.jpg"}
                    alt={booking.roomName || "Phòng"}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold">ID Phòng: {booking.idRoom}</h2>
                  <h2 className="text-lg font-semibold">Phòng {booking.roomName}</h2>
                  <div className="flex items-center gap-2">
                    {/* <User className="w-4 h-4" />
                    <span>
                      Khách hàng: <strong>{booking.customerName}</strong>
                    </span> */}
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4" />
                    <span>Nhận phòng: {booking.checkinDate ? format(new Date(booking.checkinDate), "dd/MM/yyyy") : ""}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarX className="w-4 h-4" />
                    <span>Trả phòng: {booking.checkoutDate ? format(new Date(booking.checkoutDate), "dd/MM/yyyy") : ""}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedRoomsPage;

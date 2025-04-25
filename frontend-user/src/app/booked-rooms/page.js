import React from "react";
import LeftSideBar from "../components/LeftSideBar";
import { Card, CardContent, CardHeader } from "/src/components/ui/card";
import { User, CalendarCheck, CalendarX } from "lucide-react";

const BookedRoomsPage = () => {
  const bookings = [
    {
      id: 1,
      roomName: "Phòng Deluxe",
      customerName: "Nguyễn Văn A",
      checkIn: "2025-05-01",
      checkOut: "2025-05-03",
      image: "/room/room1.jpg",
    },
    {
      id: 2,
      roomName: "Phòng VIP",
      customerName: "Trần Thị B",
      checkIn: "2025-05-02",
      checkOut: "2025-05-05",
      image: "/room/room2.jpg",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <LeftSideBar />
      <div className="flex-1 p-5 ml-55 mt-13">
        <h1 className="text-2xl text-[#1E3A8A] font-bold mb-6">Danh sách phòng đã đặt</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="rounded-2xl shadow-md">
              <CardHeader className="p-0">
                <img
                  src={booking.image}
                  alt={booking.roomName}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{booking.roomName}</h2>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Khách hàng: <strong>{booking.customerName}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4" />
                  <span>Nhận phòng: {booking.checkIn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarX className="w-4 h-4" />
                  <span>Trả phòng: {booking.checkOut}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookedRoomsPage;

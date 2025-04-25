import React from "react";
import LeftSideBar from "../components/LeftSideBar";

const notifications = [
  {
    id: 1,
    title: "Đặt phòng thành công",
    message: "Chúc mừng bạn đã đặt phòng thành công! 🏨 Chúng tôi rất mong được phục vụ bạn.",
    date: "2025-04-24",
  },
  {
    id: 2,
    title: "Đến lúc trả phòng",
    message: "Xin lưu ý rằng thời gian trả phòng của bạn là 12:00 trưa hôm nay. ⏰",
    date: "2025-04-25",
  },
  {
    id: 3,
    title: "Cảm ơn bạn đã chọn khách sạn chúng tôi",
    message: "Chúng tôi rất hân hạnh khi được phục vụ bạn. Hãy quay lại trong lần tới! 😊",
    date: "2025-04-23",
  },
];

const NotificationPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/4">
        <LeftSideBar />
      </div>

      {/* Phần nội dung */}
      <div className="w-3/4 ml-4 mt-20">
        <h1 className="text-3xl font-bold text-center mb-8">Thông Báo Từ Khách Sạn</h1>

        {/* Danh sách thông báo */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="bg-white shadow-md p-6 border border-[#062D76] rounded-lg focus:ring-2 focus:ring-[#062D76]">
              <h2 className="text-2xl font-semibold">{notification.title}</h2>
              <p className="text-gray-600 mt-2">{notification.message}</p>
              <p className="text-sm text-gray-400 mt-4">Ngày: {notification.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;

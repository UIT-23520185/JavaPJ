import React from "react";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground bg-white">
      <main className="pt-20 flex flex-1 flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
          Liên Hệ Với Chúng Tôi
        </h1>

        <div className="max-w-3xl w-full text-center mb-8">
          <p className="text-lg text-muted-foreground">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn. Dưới đây là các thông tin liên lạc của khách sạn:
          </p>

          <div className="mt-6">
            <p className="text-xl font-semibold">Địa chỉ:</p>
            <p className="text-lg">Khách Sạn Thanh Bình, ABC đường Z, Quận 1, TP. HCM</p>
          </div>

          <div className="mt-6">
            <p className="text-xl font-semibold">Số điện thoại:</p>
            <p className="text-lg">(+84) 123 456 789</p>
          </div>

          <div className="mt-6">
            <p className="text-xl font-semibold">Email:</p>
            <p className="text-lg">info@khachsan.com</p>
          </div>

          <div className="mt-6">
            <p className="text-xl font-semibold">Giờ làm việc:</p>
            <p className="text-lg">Mỗi ngày từ 8:00 AM đến 10:00 PM</p>
          </div>
        </div>

        <div className="mt-2 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">Gửi Thắc Mắc</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Họ và Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Nhập email của bạn"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Tin nhắn
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                placeholder="Nhập tin nhắn của bạn"
              ></textarea>
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-600"
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default page;

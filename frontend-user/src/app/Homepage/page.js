"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "/src/components/ui/button.jsx";
import LeftSideBar from '../components/LeftSideBar';
import { ArrowRight } from 'lucide-react';



const HomePage = () => {
  const router = useRouter();

  const goToBooking = () => {
    router.push('/Booking');
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <LeftSideBar />

      <main className="flex-1 flex flex-col items-center justify-center p-8 pl-[220px]">
        <h1 className="text-4xl text-[#1E3A8A] font-bold mb-4 ">
          Chào mừng đến với Hệ thống Thuê Khách Sạn!
        </h1>
        <p className="text-lg text-center max-w-xl text-muted-foreground">
          Trải nghiệm dịch vụ đặt phòng khách sạn tiện lợi, nhanh chóng và an toàn.  
          Chúng tôi cam kết mang đến cho bạn sự hài lòng tuyệt đối trong mỗi lần lưu trú.
        </p>
        {/* Nút chuyển trang */}
        <Button
          className="w-43 h-12 mt-8 bg-[#1E3A8A] text-white hover:bg-primary/90"
          onClick={goToBooking}
        >
          Thuê phòng ngay <ArrowRight className="w-4 h-4" />
        </Button>
      </main>
    </div>
  );
};

export default HomePage;

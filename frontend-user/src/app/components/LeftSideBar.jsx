"use client";
import { Button } from "/src/components/ui/button.jsx";
import { Separator } from "/src/components/ui/separator";

import useSidebarStore from "/src/store/sidebarStore.js";

import {
  User,
  BedDouble,
  CreditCard,
  LockKeyhole,
  Bell,
  LogOut,
  HandPlatter,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

const LeftSideBar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path) => {
    router.push(path);
    if (isSidebarOpen) toggleSidebar();
  };

  const navItems = [
    { path: "/user-profile", label: "Thông tin cá nhân", icon: <User className="mr-4" /> },
    { path: "/booked-rooms", label: "Phòng đã đặt", icon: <BedDouble className="mr-4" /> },
    { path: "/add-service", label: "Dịch vụ", icon: <HandPlatter className="mr-4" /> },
    // { path: "/payment", label: "Thanh toán", icon: <CreditCard className="mr-4" /> },
    { path: "/change-password", label: "Đổi mật khẩu", icon: <LockKeyhole className="mr-4" /> },
    { path: "/notification", label: "Thông báo", icon: <Bell className="mr-4" /> },
  ];

  const getButtonClass = (path) =>
    `w-full justify-start ${
      pathname === path ? "bg-white text-black" : "text-white bg-transparent"
    } hover:bg-gray-200`;

  return (
    <aside
      className={`fixed top-16 left-0 h-full w-55 p-4 transform transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0 bg-[#1E3A8A] shadow-lg ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:shadow-none`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Menu điều hướng */}
        <nav className="space-y-4 flex-grow">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={getButtonClass(item.path)}
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Footer - Đăng xuất */}
        <div className="flex flex-col h-full overflow-y-auto">
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground space-y-1">
            <Button
              variant="ghost"
              className="cursor-pointer text-white hover:bg-gray-200"
              onClick={() => handleNavigation("/user-login")}
            >
              <LogOut />
              <span className="ml-2 font-bold text-md">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSideBar;

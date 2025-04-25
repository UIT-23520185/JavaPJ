"use client";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useSidebarStore from "@/store/sideBarStore";
import { LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const SidebarItem = ({ path, icon, label }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();

  const isActive = pathname === path;

  const handleClick = () => {
    router.push(path);
    if (isSidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <Button
      variant="ghost"
      className={`w-full justify-start mb-3 cursor-pointer flex items-center text-[15px] ${
        isActive ? "text-white bg-[#000000]" : "text-black bg-transparent"
      }`}
      onClick={handleClick}
    >
      <img
        src={icon}
        alt={label}
        className={`mr-3 w-10 h-7 ${isActive ? "filter brightness-0 invert" : ""}`}
      />
      <span>{label}</span>
    </Button>
  );
};

const Sidebar = () => {
  const { isSidebarOpen } = useSidebarStore();

  const menuItems = [
    { path: "/dashboard", icon: "/svg/dashboard.svg", label: "Dashboard" },
    { path: "/revenue", icon: "/svg/revenue.svg", label: "Doanh thu" },
    { path: "/customers", icon: "/svg/customer.svg", label: "Khách hàng" },
    { path: "/employees", icon: "/svg/employee.svg", label: "Nhân viên" },  
    { path: "/rooms", icon: "/svg/room.svg", label: "Phòng" },  
    { path: "/services", icon: "/svg/service.svg", label: "Dịch vụ" },  
    { path: "/contracts", icon: "/svg/contract.svg", label: "Hợp đồng" },
    { path: "/settings", icon: "/svg/setting.svg", label: "Cài đặt" },
  ];

  return (
    <aside
      className={`fixed left-0 h-full w-52 p-4 transform bg-white transition-transform duration-200 ease-in-out md:translate-x-0 flex flex-col z-50 md:z-0 shadow-lg ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } ${isSidebarOpen ? "md:hidden" : ""} md:shadow-none`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <img src="/images/logo.jpg" alt="Admin Logo" className="w-36" />
        </div>
        <hr className="border-t border-gray-100 mb-6" />

        {/* Navigation */}
        <nav className="space-y-3 flex-grow ">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item}/>
          ))}
        </nav>

        <div className="mb-16">
          <Separator className="my-4" />
          <div className="text-xs text-muted-foreground space-y-1">
            <Button variant="ghost" className="cursor-pointer -ml-4">
              <LogOut /> <span className="ml-2 font-bold text-md">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

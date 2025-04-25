"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [addServicePopUpOpen, setAddServicePopUpOpen] = useState(false); // State for add service popup
  const [deleteService, setDeleteService] = useState(null);
  const [editService, setEditService] = useState(null);
  const [newServiceData, setNewServiceData] = useState({
    MaDV: "",
    TenDV: "",
    MoTa: "",
    DonGia: "",
  });

  const route = useRouter();

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setFilteredServices([]);
      return;
    }

    const filtered = serviceList.filter(
      (service) =>
        service.MaDV.toLowerCase().includes(query) ||
        service.TenDV.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      toast.error("Không tìm thấy kết quả");
    }

    setFilteredServices(filtered);
  };

  const handleAddService = () => {
    setAddServicePopUpOpen(true); // Open add service popup
  };

  const handleSaveNewService = () => {
    // Gọi API để lưu dịch vụ mới
    const newService = {
      ...newServiceData,
      HinhAnh: ["/default-image.jpg"],  // Thêm hình ảnh mặc định
    };
    setServiceList([...serviceList, newService]); // Mô phỏng thêm dịch vụ vào danh sách
    setAddServicePopUpOpen(false); // Đóng popup
    toast.success("Dịch vụ đã được thêm thành công!");
  };

  const handleEdit = (service) => {
    setEditService(service);
    setNewServiceData({
      MaDV: service.MaDV,
      TenDV: service.TenDV,
      MoTa: service.MoTa,
      DonGia: service.DonGia,
    });
    setPopUpOpen(true);
  };

  const handleSaveEdit = () => {
    // Gọi API để lưu
    setPopUpOpen(false);
    setEditService(null);
    toast.success("Cập nhật dịch vụ thành công");
  };

  const fetchServices = async () => {
    const services = [
      {
        MaDV: "DV001",
        TenDV: "Giặt ủi",
        MoTa: "Dịch vụ giặt ủi quần áo",
        DonGia: "50000",
        HinhAnh: ["/services/laundry.jpg"],
      },
      {
        MaDV: "DV002",
        TenDV: "Ăn sáng",
        MoTa: "Bữa sáng buffet",
        DonGia: "120000",
        HinhAnh: ["/services/breakfast.jpg"],
      },
    ];
    setServiceList(services);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredServices([]);
    }
  }, [searchQuery]);

  const handleDelete = async (service) => {
    // Gọi API xóa, chỉ cần xóa dịch vụ
    setServiceList(serviceList.filter((s) => s.MaDV !== service.MaDV));
    setDeleteService(null);
    setPopUpOpen(false);
    toast.success("Xóa dịch vụ thành công");
  };

  const ServiceCard = ({ service }) => {
    return (
      <div className="flex bg-white w-full rounded-lg mt-2 drop-shadow-lg p-4 gap-6 items-center">
        <img 
          src={service.HinhAnh && service.HinhAnh.length > 0 ? service.HinhAnh[0] : "/default-image.jpg"} 
          className="w-[180px] h-[120px] object-cover rounded-lg" 
        />
        <div className="flex flex-col gap-2 w-full">
          <p>ID: {service.MaDV}</p>
          <p className="font-bold text-lg">{service.TenDV}</p>
          <p className="italic">{service.MoTa}</p>
          <p className="font-semibold text-blue-600">Giá: {service.DonGia} VND</p>
          <div className="flex justify-end gap-4">
            <Button className="w-24 h-10 bg-[#062D76]" onClick={() => handleEdit(service)}>
              <Pencil className="w-5 h-5" color="white" />
              <span className="ml-2 hidden md:block">Sửa</span>
            </Button>
            <Button
              className="w-24 h-10 bg-[#D66766]"
              onClick={() => {
                setEditService(null);
                setDeleteService(service);
                setPopUpOpen(true);
              }}
            >
              <Trash2 className="w-5 h-5" color="white" />
              <span className="ml-2 hidden md:block">Xóa</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full h-full bg-[#EFF3FB]">
      <Sidebar />
      <div className="flex w-full flex-col py-6 md:ml-52 mt-5 gap-4 items-center px-10">
        <div className="flex w-full items-center justify-between mb-6">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Tìm kiếm theo mã hoặc tên dịch vụ"
              className="w-64 md:w-96 h-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <Button className="w-10 h-10 bg-[#062D76]" onClick={handleSearch}>
              <Search className="w-6 h-6" color="white" />
            </Button>
          </div>
          <Button className="w-36 h-10 bg-[#062D76]" onClick={handleAddService}>
            <Plus className="w-5 h-5" color="white" />
            <span className="ml-2">Thêm dịch vụ</span>
          </Button>
        </div>

        {(filteredServices.length > 0 ? filteredServices : serviceList).map((service) => (
          <ServiceCard key={service.MaDV} service={service} />
        ))}

        {/* Popup thêm dịch vụ */}
        {addServicePopUpOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full h-full bg-black opacity-50 absolute"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10">
              <h2 className="text-lg font-bold mb-4">Thêm dịch vụ mới</h2>
              <Input
                placeholder="Mã dịch vụ"
                className="mb-4"
                value={newServiceData.MaDV}
                onChange={(e) => setNewServiceData({ ...newServiceData, MaDV: e.target.value })}
              />
              <Input
                placeholder="Tên dịch vụ"
                className="mb-4"
                value={newServiceData.TenDV}
                onChange={(e) => setNewServiceData({ ...newServiceData, TenDV: e.target.value })}
              />
              <Input
                placeholder="Mô tả"
                className="mb-4"
                value={newServiceData.MoTa}
                onChange={(e) => setNewServiceData({ ...newServiceData, MoTa: e.target.value })}
              />
              <Input
                placeholder="Đơn giá"
                className="mb-4"
                value={newServiceData.DonGia}
                onChange={(e) => setNewServiceData({ ...newServiceData, DonGia: e.target.value })}
              />
              <div className="flex justify-end gap-4">
                <Button className="bg-gray-500" onClick={() => setAddServicePopUpOpen(false)}>Hủy</Button>
                <Button className="bg-blue-500" onClick={handleSaveNewService}>Lưu</Button>
              </div>
            </div>
          </div>
        )}

        {/* Popup chỉnh sửa dịch vụ */}
        {popUpOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full h-full bg-black opacity-50 absolute"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10">
              <h2 className="text-lg font-bold mb-4">
                {editService ? "Chỉnh sửa dịch vụ" : "Xác nhận xóa"}
              </h2>
              {editService ? (
                <>
                  <Input
                    placeholder="Tên dịch vụ"
                    className="mb-4"
                    value={newServiceData.TenDV}
                    onChange={(e) => setNewServiceData({ ...newServiceData, TenDV: e.target.value })}
                  />
                  <Input
                    placeholder="Mô tả"
                    className="mb-4"
                    value={newServiceData.MoTa}
                    onChange={(e) => setNewServiceData({ ...newServiceData, MoTa: e.target.value })}
                  />
                  <Input
                    placeholder="Đơn giá"
                    className="mb-4"
                    value={newServiceData.DonGia}
                    onChange={(e) => setNewServiceData({ ...newServiceData, DonGia: e.target.value })}
                  />
                  <div className="flex justify-end gap-4">
                    <Button className="bg-gray-500" onClick={() => { setPopUpOpen(false); setEditService(null); }}>Hủy</Button>
                    <Button className="bg-blue-500" onClick={handleSaveEdit}>Lưu</Button>
                  </div>
                </>
              ) : (
                <>
                  <p>Bạn có chắc muốn xóa dịch vụ này không?</p>
                  <div className="flex items-center mt-4">
                    <img src={deleteService.HinhAnh[0]} className="w-40 h-28 object-cover rounded-lg" />
                    <div className="ml-4">
                      <p>ID: {deleteService.MaDV}</p>
                      <p className="font-bold">{deleteService.TenDV}</p>
                      <p className="italic">{deleteService.MoTa}</p>
                      <p className="font-semibold text-blue-600">Giá: {deleteService.DonGia} VND</p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 gap-4">
                    <Button className="bg-gray-500" onClick={() => { setDeleteService(null); setPopUpOpen(false); }}>Hủy</Button>
                    <Button className="bg-red-500" onClick={() => handleDelete(deleteService)}>Xóa</Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;

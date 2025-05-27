"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchServices,
  addService,
  updateService,
  deleteService,
} from "@/lib/apiService";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceList, setServiceList] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [addServicePopUpOpen, setAddServicePopUpOpen] = useState(false);
  const [editService, setEditService] = useState(null);
  const [deleteServiceData, setDeleteServiceData] = useState(null);
  const [newServiceData, setNewServiceData] = useState({
    maDV: "",
    tenDV: "",
    moTa: "",
    donGia: "",
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await fetchServices();
      setServiceList(data);
    } catch (err) {
      toast.error("Lỗi khi tải dịch vụ");
    }
  };

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setFilteredServices([]);
      return;
    }

    const filtered = serviceList.filter(
      (service) =>
        service.maDV.toLowerCase().includes(query) ||
        service.tenDV.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      toast.error("Không tìm thấy kết quả");
    }

    setFilteredServices(filtered);
  };

  const handleAddService = () => {
    setAddServicePopUpOpen(true);
  };

  const handleSaveNewService = async () => {
    try {
      await addService(newServiceData);
      toast.success("Thêm dịch vụ thành công");
      setAddServicePopUpOpen(false);
      setNewServiceData({ MaDV: "", TenDV: "", MoTa: "", DonGia: "" });
      loadServices();
    } catch (error) {
      toast.error("Không thể thêm dịch vụ. Mã có thể đã tồn tại.");
    }
  };

  const handleEdit = (service) => {
    setEditService(service);
    setNewServiceData({
      MaDV: service.maDV,
      TenDV: service.tenDV,
      MoTa: service.moTa,
      DonGia: service.donGia,
    });
    setPopUpOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateService(newServiceData.MaDV, newServiceData);
      toast.success("Cập nhật thành công");
      setPopUpOpen(false);
      setEditService(null);
      loadServices();
    } catch (err) {
      toast.error("Lỗi khi cập nhật dịch vụ");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteService(deleteServiceData.maDV);
      toast.success("Đã xóa dịch vụ");
      setPopUpOpen(false);
      setDeleteServiceData(null);
      loadServices();
    } catch (err) {
      toast.error("Không thể xóa dịch vụ");
    }
  };

  const ServiceCard = ({ service }) => (
    <div className="flex flex-col bg-white w-full rounded-lg mt-2 drop-shadow-lg p-4 gap-2">
      <p>ID: {service.maDV}</p>
      <p className="font-bold text-lg">{service.tenDV}</p>
      <p className="italic">{service.moTa}</p>
      <p className="font-semibold text-blue-600">Giá: {service.donGia} VND</p>
      <div className="flex justify-end gap-4">
        <Button className="w-24 h-10 bg-[#062D76]" onClick={() => handleEdit(service)}>
          <Pencil className="w-5 h-5" color="white" />
          <span className="ml-2 hidden md:block">Sửa</span>
        </Button>
        <Button
          className="w-24 h-10 bg-[#D66766]"
          onClick={() => {
            setDeleteServiceData(service);
            setPopUpOpen(true);
            setEditService(null);
          }}
        >
          <Trash2 className="w-5 h-5" color="white" />
          <span className="ml-2 hidden md:block">Xóa</span>
        </Button>
      </div>
    </div>
  );

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
                value={newServiceData.maDV}
                onChange={(e) => setNewServiceData({ ...newServiceData, maDV: e.target.value })}
              />
              <Input
                placeholder="Tên dịch vụ"
                className="mb-4"
                value={newServiceData.tenDV}
                onChange={(e) => setNewServiceData({ ...newServiceData, tenDV: e.target.value })}
              />
              <Input
                placeholder="Mô tả"
                className="mb-4"
                value={newServiceData.moTa}
                onChange={(e) => setNewServiceData({ ...newServiceData, moTa: e.target.value })}
              />
              <Input
                placeholder="Đơn giá"
                className="mb-4"
                value={newServiceData.donGia}
                onChange={(e) => setNewServiceData({ ...newServiceData, donGia: e.target.value })}
              />
              <div className="flex justify-end gap-4">
                <Button className="bg-gray-500" onClick={() => setAddServicePopUpOpen(false)}>Hủy</Button>
                <Button className="bg-blue-500" onClick={handleSaveNewService}>Lưu</Button>
              </div>
            </div>
          </div>
        )}

        {/* Popup sửa hoặc xóa */}
        {popUpOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full h-full bg-black opacity-50 absolute"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-10">
              {editService ? (
                <>
                  <h2 className="text-lg font-bold mb-4">Chỉnh sửa dịch vụ</h2>
                  <Input
                    placeholder="Tên dịch vụ"
                    className="mb-4"
                    value={newServiceData.tenDV}
                    onChange={(e) => setNewServiceData({ ...newServiceData, tenDV: e.target.value })}
                  />
                  <Input
                    placeholder="Mô tả"
                    className="mb-4"
                    value={newServiceData.moTa}
                    onChange={(e) => setNewServiceData({ ...newServiceData, moTa: e.target.value })}
                  />
                  <Input
                    placeholder="Đơn giá"
                    className="mb-4"
                    value={newServiceData.donGia}
                    onChange={(e) => setNewServiceData({ ...newServiceData, donGia: e.target.value })}
                  />
                  <div className="flex justify-end gap-4">
                    <Button className="bg-gray-500" onClick={() => { setPopUpOpen(false); setEditService(null); }}>Hủy</Button>
                    <Button className="bg-blue-500" onClick={handleSaveEdit}>Lưu</Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
                  <p className="mb-4">Bạn có chắc muốn xóa dịch vụ <strong>{deleteServiceData?.tenDV}</strong>?</p>
                  <div className="flex justify-end gap-4">
                    <Button className="bg-gray-500" onClick={() => setPopUpOpen(false)}>Hủy</Button>
                    <Button className="bg-red-600" onClick={handleDelete}>Xóa</Button>
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

export default Page;

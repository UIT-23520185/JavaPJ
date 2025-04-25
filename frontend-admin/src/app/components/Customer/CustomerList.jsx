'use client';

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button"; 
import toast from "react-hot-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";

const initialCustomers = [
  { id: "KH001", name: "Nguyễn Văn A", phone: "0987654321", email: "a@gmail.com", address: "Hà Nội" },
  { id: "KH002", name: "Trần Thị B", phone: "0976543210", email: "b@gmail.com", address: "Hồ Chí Minh" },
  { id: "KH003", name: "Lê Văn C", phone: "0965432109", email: "c@gmail.com", address: "Đà Nẵng" },
];

const CustomersList = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "", email: "", address: "" });
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [deleteCustomer, setDeleteCustomer] = useState(null);
  const [addCustomerPopUpOpen, setAddCustomerPopUpOpen] = useState(false);
  
  // Hàm tạo ID tự động tăng cho khách hàng
  const getNextCustomerId = () => {
    const lastCustomerId = customers[customers.length - 1]?.id;
    if (lastCustomerId) {
      const numberPart = parseInt(lastCustomerId.replace("KH", ""));
      return `KH${(numberPart + 1).toString().padStart(3, "0")}`;
    }
    return "KH001";
  };

  // Tìm kiếm
  const filteredCustomers = customers.filter(({ id, name, phone, email, address }) =>
    [id, name, phone, email, address].some(field =>
      field && field.toString().toLowerCase().includes(search.toLowerCase())
    )
  );
  
  // Hàm xử lý sửa khách hàng
  const handleEditCustomer = (customer) => {
    setEditingCustomer({ ...customer });
  };

  const handleSaveEdit = () => {
    setCustomers(customers.map(c => (c.id === editingCustomer.id ? editingCustomer : c)));
    setEditingCustomer(null);
    toast.success("Lưu thay đổi thành công");
  };

  // Hàm xử lý thêm khách hàng
  const handleAddCustomer = () => {
    setAddCustomerPopUpOpen(true);
  };

  const confirmAddCustomer = () => {
    const newId = getNextCustomerId(); // Lấy ID khách hàng mới
    setCustomers([...customers, { id: newId, ...newCustomer }]);
    setNewCustomer({ name: "", phone: "", email: "", address: "" });
    setAddCustomerPopUpOpen(false);
    toast.success("Thêm khách hàng thành công");
  };

  // Hàm xử lý xóa khách hàng
  const handleDeleteCustomer = () => {
    setCustomers(customers.filter(c => c.id !== deleteCustomer.id));
    setDeleteCustomer(null);
    setPopUpOpen(false);
    toast.success("Xóa khách hàng thành công");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-[85%] mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Danh sách khách hàng</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm kiếm khách hàng..."
        className="w-full p-3 border border-[#062D76] rounded-lg mb-6 focus:ring-2 focus:ring-[#062D76]"
      />
      
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Thêm khách hàng</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["họ và tên", "SĐT", "email", "địa chỉ"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={`Nhập ${field}`}
              value={newCustomer[field === "họ và tên" ? "name" : field === "SĐT" ? "phone" : field === "email" ? "email" : "address"]}
              onChange={(e) => setNewCustomer({ ...newCustomer, [field === "họ và tên" ? "name" : field === "SĐT" ? "phone" : field === "email" ? "email" : "address"]: e.target.value })}
              className="p-3 border border-[#062D76] rounded-lg focus:ring-2 focus:ring-[#062D76]"
            />
          ))}
        </div>
        <button
          onClick={handleAddCustomer}
          className="mt-4 bg-[#062D76] text-white p-3 rounded-lg w-full hover:bg-gray-700 transition duration-300 flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm khách hàng
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 mt-6 rounded-lg">
        <thead>
          <tr className="bg-[#062D76] text-left text-white">
            {["ID", "Họ và tên", "Số điện thoại", "Email", "Địa chỉ", "Thao tác"].map((header) => (
              <th key={header} className="py-3 px-6 border-b">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-3 px-6 border-b">{customer.id}</td>
              <td className="py-3 px-6 border-b">{customer.name}</td>
              <td className="py-3 px-6 border-b">{customer.phone}</td>
              <td className="py-3 px-6 border-b">{customer.email}</td>
              <td className="py-3 px-6 border-b">{customer.address}</td>
              <td className="py-3 px-6 border-b flex justify-start gap-4">
                <Button
                  className="w-24 h-10 bg-[#062D76] hover:bg-gray-700"
                  onClick={() => handleEditCustomer(customer)}
                >
                  <Pencil className="w-5 h-5" color="white" />
                  <p className="ml-2 hidden md:block">Sửa</p>
                </Button>
                <Button
                  className="w-24 h-10 bg-[#D66766] hover:bg-gray-700"
                  onClick={() => {
                    setDeleteCustomer(customer);
                    setPopUpOpen(true);
                  }}
                >
                  <Trash2 className="w-5 h-5" color="white" />
                  <p className="ml-2 hidden md:block">Xóa</p>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pop-up xác nhận xóa */}
      {popUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black opacity-50 absolute"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
            <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa khách hàng này không?</p>
            <div className="flex bg-white w-full rounded-lg mt-4 p-4 items-center">
              <div className="ml-4">
                <p><strong>ID: </strong>{deleteCustomer.id}</p>
                <p><strong>Họ và tên: </strong>{deleteCustomer.name}</p>
                <p><strong>SĐT: </strong>{deleteCustomer.phone}</p>
                <p><strong>Email: </strong>{deleteCustomer.email}</p>
                <p><strong>Địa chỉ: </strong>{deleteCustomer.address}</p>
              </div>
            </div>
            <div className="flex justify-end mt-4 gap-4">
              <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setPopUpOpen(false)}>Hủy</Button>
              <Button className="bg-red-500 hover:bg-red-700" onClick={handleDeleteCustomer}>Xóa</Button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up xác nhận lưu thay đổi */}
      {editingCustomer && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black opacity-50 absolute"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
            <h2 className="text-lg font-bold mb-4">Chỉnh sửa khách hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "phone", "email", "address"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={`Nhập ${field}`}
                  value={editingCustomer[field]}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, [field]: e.target.value })}
                  className="p-3 border border-[#062D76] rounded-lg focus:ring-2 focus:ring-[#062D76]"
                />
              ))}
            </div>
            <div className="flex justify-end mt-4 gap-4">
              <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setEditingCustomer(null)}>Hủy</Button>
              <Button className="bg-[#062D76] hover:bg-gray-700" onClick={handleSaveEdit}>Lưu</Button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up xác nhận thêm khách hàng */}
      {addCustomerPopUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black opacity-50 absolute"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
            <h2 className="text-lg font-bold mb-4">Xác nhận thêm khách hàng</h2>
            <p><strong>Họ và tên:</strong> {newCustomer.name}</p>
            <p><strong>SĐT:</strong> {newCustomer.phone}</p>
            <p><strong>Email:</strong> {newCustomer.email}</p>
            <p><strong>Địa chỉ:</strong> {newCustomer.address}</p>
            <div className="flex justify-end mt-4 gap-4">
              <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setAddCustomerPopUpOpen(false)}>Hủy</Button>
              <Button className="bg-[#062D76] hover:bg-gray-700" onClick={confirmAddCustomer}>Thêm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersList;

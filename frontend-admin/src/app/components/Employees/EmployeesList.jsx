'use client';

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button"; 
import toast from "react-hot-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";

const initialEmployees = [
  { id: "NV001", name: "Nguyễn Văn A", phone: "0987654321", email: "a@gmail.com", position: "Quản lý" },
  { id: "NV002", name: "Trần Thị B", phone: "0976543210", email: "b@gmail.com", position: "Nhân viên" },
  { id: "NV003", name: "Lê Văn C", phone: "0965432109", email: "c@gmail.com", position: "Kế toán" },
];

const EmployeesList = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [newEmployee, setNewEmployee] = useState({ name: "", phone: "", email: "", position: "" });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState(null);
  const [addEmployeePopUpOpen, setAddEmployeePopUpOpen] = useState(false);
  
  // Tìm kiếm  
  const filteredEmployees = employees.filter(({ id, name, phone, email, position }) =>
    [id, name, phone, email, position].some(field =>
      field && field.toString().toLowerCase().includes(search.toLowerCase())
    )
  );
  
  // Hàm xử lý sửa nhân viên
  const handleEditEmployee = (employee) => {
    setEditingEmployee({ ...employee });
  };

  const handleSaveEdit = () => {
    setEmployees(employees.map(e => (e.id === editingEmployee.id ? editingEmployee : e)));
    setEditingEmployee(null);
    toast.success("Lưu thay đổi thành công");
  };

  // Hàm xử lý thêm nhân viên
  const handleAddEmployee = () => {
    setAddEmployeePopUpOpen(true);
  };

  const confirmAddEmployee = () => {
    const nextId = `NV${(employees.length + 1).toString().padStart(3, "0")}`;
    setEmployees([...employees, { id: nextId, ...newEmployee }]);
    setNewEmployee({ name: "", phone: "", email: "", position: "" });
    setAddEmployeePopUpOpen(false);
    toast.success("Thêm nhân viên thành công");
  };
  

  // Hàm xử lý xóa nhân viên
  const handleDeleteEmployee = () => {
    setEmployees(employees.filter(e => e.id !== deleteEmployee.id));
    setDeleteEmployee(null);
    setPopUpOpen(false);
    toast.success("Xóa nhân viên thành công");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-[85%] mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Danh sách nhân viên</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm kiếm nhân viên..."
        className="w-full p-3 border border-[#062D76] rounded-lg mb-6 focus:ring-2 focus:ring-[#062D76]"
      />
      
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-3">Thêm nhân viên</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["họ và tên", "SĐT", "email", "chức vụ"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={`Nhập ${field}`}
              value={newEmployee[field === "họ và tên" ? "name" : field === "SĐT" ? "phone" : field === "email" ? "email" : "position"]}
              onChange={(e) => setNewEmployee({ ...newEmployee, [field === "họ và tên" ? "name" : field === "SĐT" ? "phone" : field === "email" ? "email" : "position"]: e.target.value })}
              className="p-3 border border-[#062D76] rounded-lg focus:ring-2 focus:ring-[#062D76]"
            />
          ))}
        </div>
        <button
          onClick={handleAddEmployee}
          className="mt-4 bg-[#062D76] text-white p-3 rounded-lg w-full hover:bg-gray-700 transition duration-300 flex items-center justify-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm nhân viên
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-200 mt-6 rounded-lg">
        <thead>
          <tr className="bg-[#062D76] text-left text-white">
            {["ID", "Họ và tên", "Số điện thoại", "Email", "Chức vụ", "Thao tác"].map((header) => (
              <th key={header} className="py-3 px-6 border-b">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50 transition duration-300">
              <td className="py-3 px-6 border-b">{employee.id}</td>
              <td className="py-3 px-6 border-b">{employee.name}</td>
              <td className="py-3 px-6 border-b">{employee.phone}</td>
              <td className="py-3 px-6 border-b">{employee.email}</td>
              <td className="py-3 px-6 border-b">{employee.position}</td>
              <td className="py-3 px-6 border-b flex justify-start gap-4">
                <Button
                  className="w-24 h-10 bg-[#062D76] hover:bg-gray-700"
                  onClick={() => handleEditEmployee(employee)}
                >
                  <Pencil className="w-5 h-5" color="white" />
                  <p className="ml-2 hidden md:block">Sửa</p>
                </Button>
                <Button
                  className="w-24 h-10 bg-[#D66766] hover:bg-gray-700"
                  onClick={() => {
                    setDeleteEmployee(employee);
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
            <p>Bạn có chắc chắn muốn xóa nhân viên này không?</p>
            <div className="flex bg-white w-full rounded-lg mt-4 p-4 items-center">
              <div className="ml-4">
                <p><strong>ID: </strong>{deleteEmployee.id}</p>
                <p><strong>Họ và tên: </strong>{deleteEmployee.name}</p>
                <p><strong>SĐT: </strong>{deleteEmployee.phone}</p>
                <p><strong>Email: </strong>{deleteEmployee.email}</p>
                <p><strong>Chức vụ: </strong>{deleteEmployee.position}</p>
              </div>
            </div>
            <div className="flex justify-end mt-4 gap-4">
              <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setPopUpOpen(false)}>Hủy</Button>
              <Button className="bg-red-500 hover:bg-red-700" onClick={handleDeleteEmployee}>Xóa</Button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up xác nhận lưu thay đổi */}
      {editingEmployee && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black opacity-50 absolute"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
            <h2 className="text-lg font-bold mb-4">Chỉnh sửa nhân viên</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "phone", "email", "position"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={`Nhập ${field}`}
                  value={editingEmployee[field]}
                  onChange={(e) => setEditingEmployee({ ...editingEmployee, [field]: e.target.value })}
                  className="p-3 border border-[#062D76] rounded-lg focus:ring-2 focus:ring-[#062D76]"
                />
              ))}
            </div>
            <div className="flex justify-end mt-4 gap-4">
              <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setEditingEmployee(null)}>Hủy</Button>
              <Button className="bg-[#062D76] hover:bg-gray-700" onClick={handleSaveEdit}>Lưu</Button>
            </div>
          </div>
        </div>
      )}

      {/* Pop-up xác nhận thêm nhân viên */}
      {addEmployeePopUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black opacity-50 absolute"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
            <h2 className="text-lg font-bold mb-4">Xác nhận thêm nhân viên</h2>
            <p><strong>Họ và tên:</strong> {newEmployee.name}</p>
            <p><strong>SĐT:</strong> {newEmployee.phone}</p>
            <p><strong>Email:</strong> {newEmployee.email}</p>
            <p><strong>Chức vụ:</strong> {newEmployee.position}</p>
            <div className="flex justify-end mt-4 gap-4">
              <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setAddEmployeePopUpOpen(false)}>Hủy</Button>
              <Button className="bg-[#062D76] hover:bg-gray-700" onClick={confirmAddEmployee}>Thêm</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesList;

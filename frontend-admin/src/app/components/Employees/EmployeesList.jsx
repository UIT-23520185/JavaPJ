'use client';

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button"; 
import toast from "react-hot-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from "@/lib/apiEmployee";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Các state còn thiếu mà bạn dùng trong code
  const [search, setSearch] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({ name: "", phone: "", email: "", position: "" });
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [addEmployeePopUpOpen, setAddEmployeePopUpOpen] = useState(false);
  const [deleteEmployeeState, setDeleteEmployee] = useState(null); // đổi tên biến để tránh trùng hàm deleteEmployee

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        toast.error("Lỗi khi tải danh sách nhân viên");
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  // Tìm kiếm nhân viên
  const filteredEmployees = employees.filter(({ id, name, phone, email, position }) =>
    [id, name, phone, email, position].some(field =>
      field && field.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  // Sửa nhân viên
  const handleEditEmployee = (employee) => {
    setEditingEmployee({ ...employee });
  };

  const handleSaveEdit = async () => {
    try {
      const updated = await updateEmployee(editingEmployee.id, editingEmployee);
      setEmployees(
        employees.map((e) => (e.id === updated.id ? updated : e))
      );
      setEditingEmployee(null);
      toast.success("Cập nhật thành công");
    } catch {
      toast.error("Lỗi khi cập nhật nhân viên");
    }
  };

  // Mở popup thêm nhân viên
  const handleAddEmployee = () => {
    setAddEmployeePopUpOpen(true);
  };

  // Xác nhận thêm nhân viên
  const confirmAddEmployee = async () => {
    try {
      const added = await addEmployee(newEmployee);
      setEmployees([...employees, added]);
      setNewEmployee({ name: "", phone: "", email: "", position: "" });
      setAddEmployeePopUpOpen(false);
      toast.success("Thêm nhân viên thành công");
    } catch {
      toast.error("Lỗi khi thêm nhân viên");
    }
  };

  // Xóa nhân viên
  const handleDeleteEmployee = async () => {
    try {
      await deleteEmployee(deleteEmployeeState.id);
      setEmployees(employees.filter((e) => e.id !== deleteEmployeeState.id));
      setDeleteEmployee(null);
      setPopUpOpen(false);
      toast.success("Xóa thành công");
    } catch {
      toast.error("Lỗi khi xóa nhân viên");
    }
  };

  if (loading) {
    return <p className="text-center p-6">Đang tải danh sách nhân viên...</p>;
  }

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
          {["họ và tên", "SĐT", "email", "chức vụ"].map((field) => {
            const key = field === "họ và tên" ? "name" : field === "SĐT" ? "phone" : field === "email" ? "email" : "position";
            return (
              <input
                key={field}
                type={key === "email" ? "email" : "text"}
                placeholder={`Nhập ${field}`}
                value={newEmployee[key]}
                onChange={(e) => setNewEmployee({ ...newEmployee, [key]: e.target.value })}
                className="p-3 border border-[#062D76] rounded-lg focus:ring-2 focus:ring-[#062D76]"
              />
            );
          })}
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
      {popUpOpen && deleteEmployeeState && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black opacity-50 absolute"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
            <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa nhân viên này không?</p>
            <div className="flex bg-white w-full rounded-lg mt-4 p-4 items-center">
              <div className="ml-4">
                <p><strong>ID: </strong>{deleteEmployeeState.id}</p>
                <p><strong>Họ và tên: </strong>{deleteEmployeeState.name}</p>
                <p><strong>SĐT: </strong>{deleteEmployeeState.phone}</p>
                <p><strong>Email: </strong>{deleteEmployeeState.email}</p>
                <p><strong>Chức vụ: </strong>{deleteEmployeeState.position}</p>
              </div>
            </div>
            <div className="flex justify-end mt-4 gap-4">
              <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setPopUpOpen(false)}>Hủy</Button>
              <Button className="bg-red-500 hover:bg-red-700" onClick={handleDeleteEmployee}>Xóa</Button>
            </div>
          </div>
        </div>
      )}

      {/* Popup chỉnh sửa nhân viên */}
      {editingEmployee && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black opacity-50 absolute"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
            <h2 className="text-lg font-bold mb-4">Chỉnh sửa nhân viên</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                value={editingEmployee.name}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                placeholder="Họ và tên"
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={editingEmployee.phone}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                placeholder="Số điện thoại"
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                value={editingEmployee.email}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={editingEmployee.position}
                onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
                placeholder="Chức vụ"
                className="p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end mt-4 gap-4">
              <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setEditingEmployee(null)}>Hủy</Button>
              <Button className="bg-[#062D76] hover:bg-gray-700" onClick={handleSaveEdit}>Lưu</Button>
            </div>
          </div>
        </div>
      )}

      {/* Popup thêm nhân viên */}
      {addEmployeePopUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black opacity-50 absolute"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
            <h2 className="text-lg font-bold mb-4">Thêm nhân viên mới</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                placeholder="Họ và tên"
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                placeholder="Số điện thoại"
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                placeholder="Chức vụ"
                className="p-3 border border-gray-300 rounded-lg"
              />
            </div>
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

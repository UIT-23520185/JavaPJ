"use client";

import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Trash2, Pencil, Plus, Search, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const HotelContracts = () => {
    const [popUpOpen, setPopUpOpen] = useState(false);
    const [deleteContract, setDeleteContract] = useState(null);
    const [editingContract, setEditingContract] = useState(null);
    const [addContractPopUpOpen, setAddContractPopUpOpen] = useState(false);
    const [viewContractDetailPopUpOpen, setViewContractDetailPopUpOpen] = useState(false);
    const [viewingContract, setViewingContract] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [addServicePopUpOpen, setAddServicePopUpOpen] = useState(false);
    const [selectedContractForService, setSelectedContractForService] = useState(null);
    const [newService, setNewService] = useState({ serviceName: '', price: '' });
    
    const contracts = [
        {
            contractId: 'HD001',
            customerId: 'KH001',
            customerName: 'Nguyễn Văn A',
            roomId: 'P001',
            startDate: '01/04/2025',
            endDate: '01/04/2026',
            status: 'Hiệu lực',
            services: [
                { name: 'Giặt ủi', price: 50000 },
                { name: 'Ăn sáng', price: 100000 }
            ]
        },
        {
            contractId: 'HD002',
            customerId: 'KH002',
            customerName: 'Trần Thị B',
            roomId: 'P002',
            startDate: '01/01/2024',
            endDate: '01/01/2025',
            status: 'Hết hiệu lực',
            services: [
                { name: 'Xe đưa đón sân bay', price: 200000 }
            ]
        }
    ];
    

    const handleDelete = (contract) => {
        setDeleteContract(contract);
        setPopUpOpen(true);
    };

    const handleEdit = (contract) => {
        setEditingContract({ ...contract });
    };

    const handleSaveEdit = () => {
        setEditingContract(null);
        toast.success('Sửa hợp đồng thành công');
    };

    const handleAddContract = () => {
        setAddContractPopUpOpen(true);
    };

    const confirmAddContract = () => {
        setAddContractPopUpOpen(false);
        toast.success('Thêm hợp đồng thành công');
    };

    const handleDeleteContract = () => {
        setDeleteContract(null);
        setPopUpOpen(false);
        toast.success('Xóa hợp đồng thành công');
    };

    const handleViewDetails = (contract) => {
        setViewingContract(contract);
        setViewContractDetailPopUpOpen(true);
    };

    const filteredContracts = contracts.filter(contract => 
        contract.contractId.includes(searchTerm) || 
        contract.customerId.includes(searchTerm) || 
        contract.roomId.includes(searchTerm)
    );

    return (
        <div className="flex flex-row w-full h-screen bg-[#F4F7FE]">
            <Sidebar />
            <div className="flex flex-col flex-1 p-6 overflow-auto ml-55">
                <h1 className="text-2xl font-bold mb-4">Quản lý Hợp đồng Khách sạn</h1>
                <div className="flex w-full items-center justify-between mb-6">
                    <div className="flex gap-3">
                        <Input
                            type="text"
                            placeholder="Tìm kiếm hợp đồng"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64 md:w-96 h-10 text-black bg-white rounded-lg"
                        />
                        <Button className="w-10 h-10 bg-[#062D76] hover:bg-gray-700">
                            <Search />
                        </Button>
                    </div>
                    <Button className="w-36 h-10 bg-[#062D76] hover:bg-gray-700" onClick={handleAddContract}>
                        <Plus /> Thêm hợp đồng
                    </Button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                <table className="min-w-full bg-white border border-gray-200 mt-6 rounded-lg">
                        <thead>
                        <tr className="bg-[#062D76] text-left text-white">
                                <th className="border p-2">Mã Hợp Đồng</th>
                                <th className="border p-2">Mã Khách Hàng</th>
                                <th className="border p-2">Khách Hàng</th>
                                <th className="border p-2">Mã Phòng</th>
                                <th className="border p-2">Ngày Ký</th>
                                <th className="border p-2">Ngày Hết Hạn</th>
                                <th className="border p-2">Trạng Thái</th>
                                <th className="border p-2">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContracts.map(contract => {
                                const isExpired = new Date(contract.endDate) < new Date();
                                return (
                                    <tr key={contract.contractId} className={isExpired ? 'bg-red-200' : 'bg-green-200'}>
                                        <td className="border p-2">{contract.contractId}</td>
                                        <td className="border p-2">{contract.customerId}</td>
                                        <td className="border p-2">{contract.customerName}</td>
                                        <td className="border p-2">{contract.roomId}</td>
                                        <td className="border p-2">{contract.startDate}</td>
                                        <td className="border p-2">{contract.endDate}</td>
                                        <td className={`border p-2 ${isExpired ? 'text-red-600' : 'text-green-600'}`}>{contract.status}</td>
                                        <td className="border p-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <Button className="bg-[#062D76] hover:bg-gray-700 text-white px-2 py-1 rounded ml-2" onClick={() => handleEdit(contract)}>
                                                <Pencil className="w-5 h-5" color="white" /> Sửa 
                                            </Button>
                                            <Button className="bg-[#D66766] hover:bg-gray-700 text-white px-2 py-1 rounded ml-2" onClick={() => handleDelete(contract)}>
                                                <Trash2 className="w-5 h-5" color="white" /> Xóa
                                            </Button>
                                            <Button className="bg-[#4A90E2] hover:bg-blue-700 text-white px-2 py-1 rounded ml-2" onClick={() => handleViewDetails(contract)}>
                                                <Eye className="w-5 h-5" color="white" /> Xem Chi Tiết
                                            </Button>
                                            <Button className="bg-[#10B981] hover:bg-green-700 text-white px-2 py-1 rounded ml-2" onClick={() => {
                                                setSelectedContractForService(contract);
                                                setAddServicePopUpOpen(true);
                                            }}>
                                                <Plus className="w-5 h-5" color="white" /> Thêm Dịch Vụ
                                            </Button>
                                        </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pop-up xác nhận xóa hợp đồng */}
            {popUpOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="w-full h-full bg-black opacity-50 absolute"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
                        <h2 className="text-lg font-bold mb-4">Xác nhận xóa hợp đồng</h2>
                        <p>Bạn có chắc chắn muốn xóa hợp đồng <strong>{deleteContract?.contractId}</strong> của khách hàng <strong>{deleteContract?.customerName}</strong> không?</p>
                        <div className="flex justify-end mt-4 gap-4">
                            <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setPopUpOpen(false)}>Hủy</Button>
                            <Button className="bg-red-500 hover:bg-red-700" onClick={handleDeleteContract}>Xóa</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pop-up chỉnh sửa hợp đồng */}
            {editingContract && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="w-full h-full bg-black opacity-50 absolute"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
                        <h2 className="text-lg font-bold mb-4">Chỉnh sửa hợp đồng</h2>
                        <div className="grid grid-cols-1 gap-4">
                        {[
                            { key: "contractId", label: "Mã hợp đồng" },
                            { key: "customerId", label: "ID khách hàng" },
                            { key: "customerName", label: "Tên khách hàng" },
                            { key: "roomId", label: "Mã phòng" },
                            { key: "startDate", label: "Ngày bắt đầu" },
                            { key: "endDate", label: "Ngày kết thúc" },
                            { key: "status", label: "Trạng thái" },
                        ].map(({ key, label }) => (
                            <input
                                key={key}
                                type="text"
                                placeholder={label}
                                value={editingContract?.[key] || ''}
                                onChange={(e) => setEditingContract({ ...editingContract, [key]: e.target.value })}
                                className="p-3 border border-[#062D76] rounded-lg focus:ring-2 focus:ring-[#062D76]"
                            />
                        ))}
                        </div>
                        <div className="flex justify-end mt-4 gap-4">
                            <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setEditingContract(null)}>Hủy</Button>
                            <Button className="bg-[#062D76] hover:bg-gray-700" onClick={handleSaveEdit}>Lưu</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pop-up xác nhận thêm hợp đồng */}
            {addContractPopUpOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="w-full h-full bg-black opacity-50 absolute"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
                        <h2 className="text-lg font-bold mb-4">Thêm hợp đồng mới</h2>
                        <div className="grid grid-cols-1 gap-4">
                        {[
                            { key: "contractId", label: "Mã hợp đồng" },
                            { key: "customerId", label: "ID khách hàng" },
                            { key: "customerName", label: "Tên khách hàng" },
                            { key: "roomId", label: "Mã phòng" },
                            { key: "startDate", label: "Ngày bắt đầu" },
                            { key: "endDate", label: "Ngày kết thúc" },
                            { key: "status", label: "Trạng thái" },
                        ].map(({ key, label }) => (
                            <input
                                key={key}
                                type="text"
                                placeholder={label}
                                value={editingContract?.[key] || ''}
                                onChange={(e) => setEditingContract({ ...editingContract, [key]: e.target.value })}
                                className="p-3 border border-[#062D76] rounded-lg focus:ring-2 focus:ring-[#062D76]"
                            />
                        ))}
                        </div>
                        <div className="flex justify-end mt-4 gap-4">
                            <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setAddContractPopUpOpen(false)}>Hủy</Button>
                            <Button className="bg-[#062D76] hover:bg-gray-700" onClick={confirmAddContract}>Thêm</Button>
                        </div>
                    </div>
                </div>
            )}

        {/* Pop-up xem chi tiết hợp đồng */}
        {viewContractDetailPopUpOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="w-full h-full bg-black opacity-50 absolute"></div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative z-10">
                    <h2 className="text-lg font-bold mb-4">Chi tiết hợp đồng</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <p><strong>Mã hợp đồng: </strong>{viewingContract.contractId}</p>
                        <p><strong>Mã khách hàng: </strong>{viewingContract.customerId}</p>
                        <p><strong>Tên khách hàng: </strong>{viewingContract.customerName}</p>
                        <p><strong>Mã phòng: </strong>{viewingContract.roomId}</p>
                        <p><strong>Ngày bắt đầu: </strong>{viewingContract.startDate}</p>
                        <p><strong>Ngày kết thúc: </strong>{viewingContract.endDate}</p>
                        <p><strong>Trạng thái: </strong>{viewingContract.status}</p>
                        <div>
                            <p className="font-semibold mt-4 mb-2">Dịch vụ sử dụng:</p>
                            {viewingContract.services && viewingContract.services.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-1">
                                    {viewingContract.services.map((service, index) => (
                                        <li key={index}>
                                            {service.name} - {service.price.toLocaleString('vi-VN')} VND
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="italic text-gray-500">Không có dịch vụ</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end mt-4 gap-4">
                        <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setViewContractDetailPopUpOpen(false)}>Đóng</Button>
                    </div>
                </div>
            </div>
        )}
            {/* ✅ Pop-up Thêm Dịch Vụ */}
        
        {addServicePopUpOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="w-full h-full bg-black opacity-50 absolute"></div>
                <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
                    <h2 className="text-lg font-bold mb-4">Thêm Dịch Vụ cho Hợp Đồng {selectedContractForService?.contractId}</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            type="text"
                            placeholder="Nhập mã dịch vụ (VD: DV001)"
                            value={newService.serviceName}
                            onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
                            className="p-3 border border-[#062D76] rounded-lg focus:ring-2 focus:ring-[#062D76]"
                        />
                    </div>
                    <div className="flex justify-end mt-4 gap-4">
                        <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setAddServicePopUpOpen(false)}>Hủy</Button>
                        <Button className="bg-[#10B981] hover:bg-green-700" onClick={() => {
                            // TODO: Gửi mã dịch vụ lên backend tại đây nếu có tích hợp DB
                            setAddServicePopUpOpen(false);
                            setNewService({ serviceName: '', price: '' });
                            toast.success('Đã thêm mã dịch vụ vào hợp đồng');
                        }}>Thêm</Button>
                    </div>
                </div>
            </div>
        )}

        </div>
    );
};

export default HotelContracts;


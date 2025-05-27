'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from '@/app/components/ui/button';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const SettingPage = () => {
  const [settings, setSettings] = useState({
    hotelName: '',
    hotelAddress: '',
    hotelPhone: '',
    hotelEmail: '',
  });
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/settings');
        // đảm bảo các trường luôn là chuỗi (fallback '')
        setSettings({
          hotelName: response.data.hotelName || '',
          hotelAddress: response.data.hotelAddress || '',
          hotelPhone: response.data.hotelPhone || '',
          hotelEmail: response.data.hotelEmail || '',
        });
      } catch (error) {
        toast.error('Lấy cài đặt thất bại!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSetting();
  }, []);

  const handleSave = async () => {
  try {
    setLoading(true);
    await axios.post('http://localhost:8080/api/settings', settings);
    toast.success('Cài đặt đã được lưu thành công!');
    setPopUpOpen(false);
  } catch (error) {
    toast.error('Lưu cài đặt thất bại!');
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const handleCancel = () => {
    setSettings({
      hotelName: '',
      hotelAddress: '',
      hotelPhone: '',
      hotelEmail: '',
    });
    toast.error('Thay đổi đã bị hủy');
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="flex flex-row w-full h-screen bg-[#F4F7FE]">
      <Sidebar />
      <div className="flex flex-col flex-1 p-8 overflow-auto ml-55 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cài đặt hệ thống</h2>

        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="hotelName" className="text-lg text-gray-700">Tên khách sạn</label>
            <input
              type="text"
              id="hotelName"
              className="p-3 border border-[#062D76] rounded-md w-full mt-2 focus:outline-none focus:ring-2 focus:ring-[#062D76] transition"
              value={settings.hotelName || ''}
              onChange={(e) => setSettings({ ...settings, hotelName: e.target.value })}
              placeholder="Nhập tên khách sạn"
            />
          </div>

          <div>
            <label htmlFor="hotelAddress" className="text-lg text-gray-700">Địa chỉ</label>
            <input
              type="text"
              id="hotelAddress"
              className="p-3 border border-[#062D76] rounded-md w-full mt-2 focus:outline-none focus:ring-2 focus:ring-[#062D76] transition"
              value={settings.hotelAddress || ''}
              onChange={(e) => setSettings({ ...settings, hotelAddress: e.target.value })}
              placeholder="Nhập địa chỉ"
            />
          </div>

          <div>
            <label htmlFor="hotelPhone" className="text-lg text-gray-700">Số điện thoại</label>
            <input
              type="text"
              id="hotelPhone"
              className="p-3 border border-[#062D76] rounded-md w-full mt-2 focus:outline-none focus:ring-2 focus:ring-[#062D76] transition"
              value={settings.hotelPhone || ''}
              onChange={(e) => setSettings({ ...settings, hotelPhone: e.target.value })}
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div>
            <label htmlFor="hotelEmail" className="text-lg text-gray-700">Email</label>
            <input
              type="email"
              id="hotelEmail"
              className="p-3 border border-[#062D76] rounded-md w-full mt-2 focus:outline-none focus:ring-2 focus:ring-[#062D76] transition"
              value={settings.hotelEmail || ''}
              onChange={(e) => setSettings({ ...settings, hotelEmail: e.target.value })}
              placeholder="Nhập email"
            />
          </div>
        </div>

        <div className="flex justify-end gap-6 mt-8">
          <Button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-all duration-300"
            onClick={handleCancel}
          >
            <X className="w-5 h-5" />
            <span>Hủy</span>
          </Button>
          <Button
            className="bg-[#062D76] hover:bg-[#1E3A8A] text-white py-2 px-4 rounded-md flex items-center gap-2 transition-all duration-300"
            onClick={() => setPopUpOpen(true)}
          >
            <span>Lưu</span>
          </Button>
        </div>
      </div>

      {popUpOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black opacity-50 absolute"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
            <h2 className="text-lg font-bold mb-4">Xác nhận lưu thay đổi</h2>
            <p>Bạn có chắc chắn muốn lưu các thay đổi này không?</p>
            <div className="flex justify-end mt-4 gap-4">
              <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setPopUpOpen(false)}>Hủy</Button>
              <Button className="bg-[#062D76] hover:bg-[#1E3A8A]" onClick={handleSave}>Lưu</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingPage;

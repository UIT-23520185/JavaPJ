'use client'

import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Users, BedDouble } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/admin-login');
    };

    return (
        <div className="flex w-full h-screen bg-[#F4F7FE]">
            <Sidebar />
            <div className="flex flex-col flex-1 p-6 overflow-auto ml-55">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Bảng điều khiển</h1>
                    <div className="text-sm text-gray-600 flex items-center gap-4">
                        Admin
                        <Button
                            className="bg-[#062D76] hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </Button>
                    </div>
                </div>

                {/* Thống kê tổng quan */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-white shadow-md rounded-2xl">
                        <CardContent className="flex items-center p-5">
                            <BedDouble className="w-10 h-10 text-indigo-600 mr-4" />
                            <div>
                                <p className="text-sm text-gray-500">Phòng hiện có</p>
                                <p className="text-xl font-semibold text-gray-800">48</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md rounded-2xl">
                        <CardContent className="flex items-center p-5">
                            <Users className="w-10 h-10 text-green-600 mr-4" />
                            <div>
                                <p className="text-sm text-gray-500">Khách hàng</p>
                                <p className="text-xl font-semibold text-gray-800">120</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md rounded-2xl">
                        <CardContent className="flex items-center p-5">
                            <BarChart3 className="w-10 h-10 text-orange-500 mr-4" />
                            <div>
                                <p className="text-sm text-gray-500">Đơn đặt phòng</p>
                                <p className="text-xl font-semibold text-gray-800">85</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md">
                    <p className="text-gray-600">Chào mừng bạn đến với hệ thống quản lý khách sạn!</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

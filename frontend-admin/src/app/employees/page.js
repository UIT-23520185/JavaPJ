import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import EmployeesList from '../components/Employees/EmployeesList.jsx'

const page = () => {
    return (
        <div className="flex flex-row w-full h-screen bg-[#F4F7FE]">
            <Sidebar />
            <main className="flex-1 p-6 ml-55">
                <EmployeesList />
            </main>
        </div>
    )
}

export default page
import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import CustomerList from '../components/Customer/CustomerList.jsx';


const CustomersPage = () => {
    return (
      <div className="flex flex-row w-full h-screen bg-[#F4F7FE]">
        <Sidebar />
        <main className="flex-1 p-6 ml-55">
          <CustomerList />
        </main>
      </div>
    );
  };
  
  export default CustomersPage;
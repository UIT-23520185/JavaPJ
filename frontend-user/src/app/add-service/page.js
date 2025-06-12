"use client";

import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { Button } from "../components/ui/button";

const ServicePage = () => {
  const [services, setServices] = useState([]); 
  const [selectedServices, setSelectedServices] = useState([]);

  // Gọi API khi component mount
  useEffect(() => {
    fetch("http://localhost:8080/api/services") 
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Lỗi khi fetch dịch vụ:", error));
  }, []);

  const toggleService = (serviceId) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.includes(serviceId)
        ? prevSelectedServices.filter((id) => id !== serviceId)
        : [...prevSelectedServices, serviceId]
    );
  };

  return (
    <div className="relative min-h-screen">
      <LeftSideBar />

      <div className="pl-64 pr-6 py-12">
        <h2 className="text-2xl font-bold mb-8 mt-13">Chọn dịch vụ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.maDV}
              className="flex flex-col items-center bg-white border p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out"
            >
              <img
                src={service.image || "/services/default-image.jpg"} // fallback nếu thiếu ảnh
                alt={service.tenDV}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-center">{service.tenDV}</h3>
              <p className="text-gray-600 text-center mt-2">{service.moTa}</p>

              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.maDV)}
                  onChange={() => toggleService(service.maDV)}
                  id={service.maDV}
                  className="w-5 h-5"
                />
                <label htmlFor={service.maDV} className="text-sm">
                  {selectedServices.includes(service.maDV) ? "Bỏ chọn" : "Chọn dịch vụ"}
                </label>
              </div>

              <Button
                onClick={() => toggleService(service.maDV)}
                className="mt-4 w-full"
              >
                {selectedServices.includes(service.maDV) ? "Bỏ chọn" : "Chọn dịch vụ"}
              </Button>
            </div>
          ))}
        </div>

        {selectedServices.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Dịch vụ đã chọn:</h3>
            <ul className="list-disc pl-6">
              {selectedServices.map((maDV) => {
                const service = services.find((s) => s.maDV === maDV);
return <li key={maDV}>{service?.tenDV}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;

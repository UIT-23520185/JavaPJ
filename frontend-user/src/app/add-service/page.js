"use client";

import React, { useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import { Button } from "../components/ui/button";

const ServicePage = () => {
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (serviceId) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.includes(serviceId)
        ? prevSelectedServices.filter((id) => id !== serviceId)
        : [...prevSelectedServices, serviceId]
    );
  };

  const services = [
    {
      id: "1",
      name: "Dịch vụ Giặt ủi",
      image: ["/services/default-image.jpg"],
      description: "Giặt ủi quần áo của bạn nhanh chóng và chất lượng.",
    },
    {
      id: "2",
      name: "Dịch vụ Spa",
      image: ["/services/default-image.jpg"],
      description: "Trải nghiệm spa thư giãn giúp bạn lấy lại sức khỏe.",
    },
    {
      id: "3",
      name: "Dịch vụ Đưa đón sân bay",
      image: ["/services/default-image.jpg"],
      description: "Chúng tôi cung cấp dịch vụ đưa đón sân bay tiện lợi.",
    },
    {
      id: "4",
      name: "Dịch vụ Nhà hàng",
      image: ["/services/default-image.jpg"],
      description: "Hãy thưởng thức các món ăn ngon tại nhà hàng của chúng tôi.",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <LeftSideBar />

      <div className="pl-64 pr-6 py-12"> {/* Cách trái bằng chiều rộng LeftSideBar */}
        <h2 className="text-2xl font-bold mb-8 mt-13">Chọn dịch vụ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center bg-white border p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-center">{service.name}</h3>
              <p className="text-gray-600 text-center mt-2">{service.description}</p>

              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => toggleService(service.id)}
                  id={service.id}
                  className="w-5 h-5"
                />
                <label htmlFor={service.id} className="text-sm">
                  {selectedServices.includes(service.id) ? "Bỏ chọn" : "Chọn dịch vụ"}
                </label>
              </div>

              <Button
                onClick={() => toggleService(service.id)}
                className="mt-4 w-full"
              >
                {selectedServices.includes(service.id) ? "Bỏ chọn" : "Chọn dịch vụ"}
              </Button>
            </div>
          ))}
        </div>

        {selectedServices.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Dịch vụ đã chọn:</h3>
            <ul className="list-disc pl-6">
              {selectedServices.map((serviceId) => {
                const service = services.find((s) => s.id === serviceId);
                return <li key={serviceId}>{service?.name}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;

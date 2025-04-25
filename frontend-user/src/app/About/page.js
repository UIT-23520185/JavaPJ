import React from 'react';

const page = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground bg-white">
      <main className="pt-16 flex flex-1 flex-col items-center justify-center px-6 md:px-16">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
          Giới thiệu về Khách Sạn
        </h1>

        <p className="text-lg text-justify max-w-3xl text-muted-foreground mb-4">
          Chào mừng bạn đến với hệ thống khách sạn của chúng tôi – nơi lý tưởng cho những kỳ nghỉ dưỡng trọn vẹn và những chuyến công tác hiệu quả. 
          Chúng tôi cung cấp đa dạng loại phòng hiện đại, dịch vụ tiện ích như spa, nhà hàng, phòng họp và đội ngũ nhân viên phục vụ chuyên nghiệp, tận tâm.
        </p>

        <p className="text-lg text-justify max-w-3xl text-muted-foreground">
          Từ vị trí thuận tiện đến phong cách kiến trúc sang trọng, khách sạn của chúng tôi cam kết mang lại sự hài lòng tối đa cho mọi khách hàng. 
          Hãy đến và trải nghiệm sự khác biệt cùng chúng tôi!
        </p>
      </main>
    </div>
  );
};

export default page;

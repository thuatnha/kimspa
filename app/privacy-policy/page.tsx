"use client";

import React from "react";
import Header from "@/components/share/header";
import Footer from "@/components/share/footer";
const PrivacyPolicyPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">
          CHÍNH SÁCH QUYỀN RIÊNG TƯ
        </h1>
        <p className="mb-6 text-center font-semibold">
          Hộ kinh doanh KIM SKIN CLINIC & HEALTH CARE
        </p>

        <Section title="1. Mục đích của chính sách">
          Chính sách này nhằm giải thích cách chúng tôi thu thập, sử dụng, lưu
          trữ và bảo vệ thông tin cá nhân của khách hàng trong quá trình sử dụng
          dịch vụ tại spa.
        </Section>

        <Section title="2. Dữ liệu cá nhân được thu thập">
          <ul className="list-disc list-inside space-y-1">
            <li>Họ tên, số điện thoại, email</li>
            <li>Ngày sinh, giới tính (nếu được cung cấp)</li>
            <li>
              Thông tin sức khỏe liên quan đến dịch vụ trị liệu (nếu khách hàng
              chia sẻ)
            </li>
            <li>Lịch sử sử dụng dịch vụ và đặt lịch</li>
            <li>Phản hồi, khiếu nại, đánh giá</li>
            <li>
              Dữ liệu thanh toán (không bao gồm thông tin thẻ tín dụng chi tiết)
            </li>
          </ul>
        </Section>

        <Section title="3. Mục đích sử dụng dữ liệu">
          <ul className="list-disc list-inside space-y-1">
            <li>Đặt lịch hẹn, xác nhận và nhắc lịch</li>
            <li>Cá nhân hóa trải nghiệm chăm sóc và liệu trình</li>
            <li>Gửi thông báo, khuyến mãi, chăm sóc khách hàng</li>
            <li>Cải thiện chất lượng dịch vụ</li>
            <li>Tuân thủ yêu cầu pháp lý và lưu trữ kế toán</li>
          </ul>
        </Section>

        <Section title="4. Bảo mật dữ liệu">
          <ul className="list-disc list-inside space-y-1">
            <li>Dữ liệu được lưu trữ trên hệ thống có kiểm soát truy cập.</li>
            <li>Nhân viên có nghĩa vụ bảo mật thông tin khách hàng.</li>
            <li>
              Không chia sẻ dữ liệu với bên thứ ba trừ khi được khách hàng đồng
              ý hoặc có yêu cầu pháp lý.
            </li>
          </ul>
        </Section>

        <Section title="5. Quyền của khách hàng">
          <ul className="list-disc list-inside space-y-1">
            <li>Yêu cầu xem, sửa đổi hoặc xóa dữ liệu cá nhân của mình</li>
            <li>Từ chối nhận thông tin tiếp thị</li>
            <li>Khiếu nại nếu phát hiện dữ liệu bị xử lý sai mục đích</li>
          </ul>
          <p className="mt-2">
            Để thực hiện các quyền này, Quý khách có thể liên hệ trực tiếp qua
            email hoặc điện thoại.
          </p>
        </Section>

        <Section title="6. Thời gian lưu trữ">
          Dữ liệu cá nhân được lưu giữ trong thời gian cần thiết để phục vụ dịch
          vụ và tuân thủ yêu cầu pháp luật, sau đó sẽ được xóa hoặc ẩn danh.
        </Section>

        <Section title="7. Sửa đổi chính sách">
          Chính sách có thể được cập nhật theo thời gian. Mọi thay đổi sẽ được
          công bố trên website/spa. Khách hàng được khuyến khích thường xuyên
          kiểm tra để cập nhật thông tin.
        </Section>

        <Section title="8. Liên hệ">
          <p className="mb-1">
            {" "}
            <strong>Hộ kinh doanh KIM SKIN CLINIC & HEALTH CARE</strong>
          </p>
          <p>
            Địa chỉ: 153 đường Đặng Văn Ngữ, phường 13, quận Phú Nhuận, Tp Hồ
            Chí Minh, Việt Nam
          </p>
          <p>Điện thoại: 0938060555</p>
          <p>Email: nguyenhoangbaokim2015@gmail.com</p>
        </Section>
      </div>
      <Footer />
    </>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <div className="text-justify">{children}</div>
  </div>
);

export default PrivacyPolicyPage;

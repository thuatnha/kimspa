"use client";

import React from "react";
import Header from "@/components/share/header";
import Footer from "@/components/share/footer";

const DataDeletionPolicyPage = () => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">
          XÓA DỮ LIỆU NGƯỜI DÙNG
        </h1>

        <p className="mb-6 text-center">
          Chúng tôi cam kết tôn trọng và bảo vệ quyền riêng tư của khách hàng.
          Nếu Quý khách không còn sử dụng dịch vụ và mong muốn xóa toàn bộ dữ
          liệu cá nhân đã cung cấp, xin vui lòng đọc kỹ nội dung chính sách dưới
          đây:
        </p>

        <Section title="1. Phạm vi dữ liệu có thể bị xóa">
          Các loại dữ liệu mà chúng tôi có thể xóa theo yêu cầu bao gồm:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Họ tên, số điện thoại, email</li>
            <li>Thông tin lịch sử đặt lịch, sử dụng dịch vụ</li>
            <li>Ghi chú về tình trạng sức khỏe (nếu có)</li>
            <li>
              Dữ liệu giao dịch và hóa đơn (nếu không bị yêu cầu lưu trữ theo
              luật)
            </li>
          </ul>
          <p className="mt-2 italic font-semibold">
            Lưu ý: Một số dữ liệu sẽ được lưu trữ trong thời hạn bắt buộc theo
            quy định của pháp luật (ví dụ: hóa đơn tài chính).
          </p>
        </Section>

        <Section title="2. Cách yêu cầu xóa dữ liệu">
          <p>
            Khách hàng có thể yêu cầu xóa dữ liệu cá nhân thông qua một trong
            các cách sau:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              Gửi email đến: <strong>nguyenhoangbaokim2015@gmail.com</strong>
            </li>
            <li>
              Gọi đến số điện thoại: <strong>0938060555</strong>
            </li>
            <li>Gửi yêu cầu trực tiếp tại spa</li>
          </ul>
          <p className="mt-2">
            Yêu cầu cần cung cấp thông tin xác minh danh tính để tránh trường
            hợp giả mạo.
          </p>
        </Section>

        <Section title="3. Thời gian xử lý">
          <p>
            Yêu cầu xóa dữ liệu sẽ được xử lý trong vòng{" "}
            <strong>7 ngày làm việc</strong> kể từ ngày xác minh danh tính thành
            công. Sau khi xóa, chúng tôi sẽ gửi xác nhận cho khách hàng qua
            email hoặc tin nhắn.
          </p>
        </Section>

        <Section title="4. Hệ quả sau khi xóa dữ liệu">
          <p>Sau khi dữ liệu bị xóa:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              Khách hàng sẽ <strong>không thể truy cập lịch sử dịch vụ</strong>{" "}
              hoặc các quyền lợi trước đó.
            </li>
            <li>
              Nếu khách hàng quay lại sử dụng dịch vụ, sẽ cần đăng ký thông tin
              lại từ đầu.
            </li>
          </ul>
        </Section>

        <Section title="5. Liên hệ hỗ trợ">
          <p>
            Mọi thắc mắc hoặc vấn đề liên quan đến quyền xóa dữ liệu, vui lòng
            liên hệ:
          </p>
          <div className="mt-2">
            <p>
              <strong>Hộ kinh doanh KIM SKIN CLINIC & HEALTH CARE</strong>
            </p>
            <p>
              Địa chỉ: Đang chuyển địa điểm (sẽ cập nhật sau khi có địa chỉ mới)
            </p>
            <p>Điện thoại: 0938060555</p>
            <p>Email: nguyenhoangbaokim2015@gmail.com</p>
          </div>
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
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="text-justify">{children}</div>
  </div>
);

export default DataDeletionPolicyPage;

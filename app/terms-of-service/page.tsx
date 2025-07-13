"use client";

import React from "react";
import Header from "@/components/share/header";
import Footer from "@/components/share/footer";
const TermsOfServicePage = () => {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center">
          ĐIỀU KHOẢN DỊCH VỤ
        </h1>
        <h2 className="text-xl font-semibold mb-2 text-center">
          Hộ kinh doanh KIM SKIN CLINIC & HEALTH CARE
        </h2>
        <p className="mb-6 text-center">
          Cảm ơn Quý khách đã tin tưởng sử dụng dịch vụ của chúng tôi.
        </p>

        <Section title="1. Giới thiệu">
          Hộ kinh doanh KIM SKIN CLINIC & HEALTH CARE chuyên cung cấp các dịch
          vụ chăm sóc sức khỏe và làm đẹp như: spa thư giãn, massage trị liệu,
          xoa bóp bấm huyệt, chăm sóc da, và các liệu trình phục hồi thể chất
          không sử dụng thuốc. Tất cả các dịch vụ đều được thực hiện bởi nhân
          viên được đào tạo chuyên môn.
        </Section>

        <Section title="2. Điều kiện sử dụng dịch vụ">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Khách hàng cần cung cấp đầy đủ và trung thực thông tin sức khỏe.
            </li>
            <li>
              Khách hàng có bệnh lý nghiêm trọng cần được bác sĩ đồng ý trước
              khi sử dụng dịch vụ.
            </li>
            <li>
              Dịch vụ của chúng tôi không thay thế cho điều trị y tế chuyên sâu.
            </li>
          </ul>
        </Section>

        <Section title="3. Đặt lịch và hủy lịch">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Có thể đặt lịch trực tiếp, qua điện thoại, hoặc hệ thống trực
              tuyến (nếu có).
            </li>
            <li>
              Hủy lịch ít nhất <strong>2 giờ</strong> trước giờ hẹn để tránh mất
              phí.
            </li>
            <li>
              Đến trễ quá <strong>15 phút</strong> có thể bị hủy hoặc điều chỉnh
              lịch hẹn.
            </li>
          </ul>
        </Section>

        <Section title="4. Giá cả và thanh toán">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Giá được niêm yết công khai và có thể thay đổi theo chương trình
              khuyến mãi.
            </li>
            <li>Chấp nhận tiền mặt, chuyển khoản, ví điện tử (nếu có).</li>
            <li>
              Thanh toán toàn bộ chi phí trước hoặc ngay sau khi hoàn thành liệu
              trình.
            </li>
          </ul>
        </Section>

        <Section title="5. Chính sách bảo mật thông tin">
          Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng và không
          chia sẻ cho bên thứ ba trừ khi có sự đồng ý của khách hàng hoặc theo
          yêu cầu của cơ quan chức năng.
        </Section>

        <Section title="6. Hành vi ứng xử">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Khách hàng cần giữ thái độ tôn trọng nhân viên và khách khác.
            </li>
            <li>
              Mọi hành vi quấy rối hoặc vi phạm thuần phong mỹ tục sẽ bị từ chối
              phục vụ.
            </li>
            <li>
              Chúng tôi có quyền từ chối phục vụ nếu khách vi phạm điều khoản.
            </li>
          </ul>
        </Section>

        <Section title="7. Khiếu nại và hoàn tiền">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Gửi khiếu nại trong vòng <strong>24 giờ</strong> sau khi sử dụng
              dịch vụ.
            </li>
            <li>
              Hoàn tiền chỉ áp dụng khi có lỗi từ spa và theo chính sách nội bộ.
            </li>
            <li>
              Không hoàn tiền với lý do cảm nhận chủ quan không có sai sót từ
              spa.
            </li>
          </ul>
        </Section>

        <Section title="8. Miễn trừ trách nhiệm">
          Chúng tôi không chịu trách nhiệm nếu khách không khai báo trung thực
          tình trạng sức khỏe hoặc không tuân thủ hướng dẫn từ nhân viên.
        </Section>

        <Section title="9. Thay đổi điều khoản">
          Điều khoản có thể được cập nhật mà không cần báo trước. Quý khách có
          trách nhiệm theo dõi phiên bản mới nhất.
        </Section>

        <div className="mt-8 border-t pt-4 text-sm text-gray-600">
          <p>
            <strong>Liên hệ:</strong>
          </p>
          <p>Hộ kinh doanh KIM SKIN CLINIC & HEALTH CARE</p>
          <p>
            Địa chỉ: Đang chuyển địa điểm (sẽ cập nhật sau khi có địa chỉ mới)
          </p>
          <p>Điện thoại: 0938060555</p>
          <p>Email: nguyenhoangbaokim2015@gmail.com</p>
        </div>
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

export default TermsOfServicePage;

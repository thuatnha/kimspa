import { motion } from "framer-motion";
import { AnimatedSection } from "../animated-section";
import Link from "next/link";
import { Clock, Facebook, Instagram, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
      <footer id="contact" className="w-full border-t py-12 md:py-16 lg:py-20 bg-[#FFFDF5] overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-4">
            <AnimatedSection direction="right" delay={0.1}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#fdc700]">KimSkin</span>
                  <span className="text-xl font-light text-[#5D5D5D]">Clinic</span>
                </div>
                <p className="text-sm text-[#5D5D5D]">
                  Không gian thư giãn sang trọng, dịch vụ chăm sóc da chuyên nghiệp. Nơi vẻ đẹp được tái sinh.
                </p>
                <div className="flex gap-4">
                  <motion.div whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }}>
                    <Link href="#" className="text-[#5D5D5D] hover:text-[#fdc700] transition-colors">
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }}>
                    <Link href="#" className="text-[#5D5D5D] hover:text-[#fdc700] transition-colors">
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
  
            {[
              {
                title: "Dịch Vụ",
                links: ["Trẻ Hóa Da Mặt", "Điều Trị Nám Sâu", "Vật Lý Trị Liệu", "Chăm Sóc Body", "Xem Tất Cả Dịch Vụ"],
              },
              {
                title: "Thông Tin",
                links: ["Về Chúng Tôi", "Đội Ngũ Chuyên Gia", "Blog Làm Đẹp", "Khuyến Mãi", "Tuyển Dụng"],
              },
            ].map((column, index) => (
              <AnimatedSection key={column.title} direction="up" delay={0.2 + index * 0.1}>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-[#fdc700]">{column.title}</h3>
                  <nav className="flex flex-col gap-2">
                    {column.links.map((link, i) => (
                      <motion.div key={link} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <Link href="#" className="text-sm text-[#5D5D5D] hover:text-[#fdc700] transition-colors">
                          {link}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
              </AnimatedSection>
            ))}
  
            <AnimatedSection direction="left" delay={0.4}>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-[#fdc700]">Liên Hệ</h3>
                <div className="flex flex-col gap-2">
                  <motion.div className="flex items-start gap-2" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <MapPin className="h-5 w-5 text-[#fdc700] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#5D5D5D]">Đang chuyển địa điểm (sẽ cập nhật sau khi có địa chỉ mới)</span>
                  </motion.div>
                  <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Phone className="h-5 w-5 text-[#fdc700]" />
                    <span className="text-sm text-[#5D5D5D]">0938 060 555</span>
                  </motion.div>
                  <motion.div className="flex items-center gap-2" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Clock className="h-5 w-5 text-[#fdc700]" />
                    <span className="text-sm text-[#5D5D5D]">8:00 - 19:00, Thứ 2 - Chủ Nhật</span>
                  </motion.div>
                </div>
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection direction="up" delay={0.6}>
            <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-[#5D5D5D]">
                © {new Date().getFullYear()} Kim Skin Beauty And Health Care. Tất cả quyền được bảo lưu.
              </p>
              <nav className="flex gap-4">
                <Link href="#" className="text-xs text-[#5D5D5D] hover:text-[#fdc700] transition-colors">
                  Điều Khoản Dịch Vụ
                </Link>
                <Link href="#" className="text-xs text-[#5D5D5D] hover:text-[#fdc700] transition-colors">
                  Chính Sách Bảo Mật
                </Link>
              </nav>
            </div>
          </AnimatedSection>
        </div>
      </footer>
    )
  }
  
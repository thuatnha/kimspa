"use client";

import { Gallery } from "@/components/gallery/gallery";
import { AnimatedSection } from "@/components/animated-section";
import { AnimatedText } from "@/components/animated-text";
import { motion } from "framer-motion";
import Header from "@/components/share/header";
import Footer from "@/components/share/footer";

// Danh sách hình ảnh mẫu cho gallery
const galleryItems = [
  {
    id: "1",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Không gian spa",
    title: "Không Gian Thư Giãn",
    description: "Không gian sang trọng, yên tĩnh tại KimSkin Clinic",
    category: "Không gian",
  },
  {
    id: "2",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Trẻ hóa da",
    title: "Liệu Trình Trẻ Hóa Da",
    description: "Công nghệ RF Thermage hiện đại",
    category: "Dịch vụ",
  },
  {
    id: "3",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Massage thư giãn",
    title: "Massage Thư Giãn",
    description: "Kỹ thuật massage Thụy Điển",
    category: "Dịch vụ",
  },
  {
    id: "4",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Sản phẩm spa",
    title: "Sản Phẩm Cao Cấp",
    description: "Sản phẩm organic nhập khẩu",
    category: "Sản phẩm",
  },
  {
    id: "5",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Kết quả điều trị",
    title: "Kết Quả Điều Trị Nám",
    description: "Sau 3 lần điều trị",
    category: "Kết quả",
  },
  {
    id: "6",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Phòng trị liệu",
    title: "Phòng Trị Liệu Riêng Tư",
    description: "Không gian riêng tư, yên tĩnh",
    category: "Không gian",
  },
  {
    id: "7",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Chăm sóc da",
    title: "Chăm Sóc Da Chuyên Sâu",
    description: "Liệu trình dưỡng ẩm cao cấp",
    category: "Dịch vụ",
  },
  {
    id: "8",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Kết quả trẻ hóa",
    title: "Kết Quả Trẻ Hóa Da",
    description: "Sau 5 lần điều trị",
    category: "Kết quả",
  },
  {
    id: "9",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Sản phẩm dưỡng da",
    title: "Bộ Sản Phẩm Dưỡng Da",
    description: "Dành cho da nhạy cảm",
    category: "Sản phẩm",
  },
  {
    id: "10",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Khu vực đón tiếp",
    title: "Khu Vực Đón Tiếp",
    description: "Thiết kế hiện đại, sang trọng",
    category: "Không gian",
  },
  {
    id: "11",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Điều trị mụn",
    title: "Điều Trị Mụn Chuyên Sâu",
    description: "Công nghệ ánh sáng sinh học",
    category: "Dịch vụ",
  },
  {
    id: "12",
    src: "/placeholder.svg?height=600&width=600",
    alt: "Kết quả điều trị mụn",
    title: "Kết Quả Điều Trị Mụn",
    description: "Sau 4 lần điều trị",
    category: "Kết quả",
  },
];

// Danh sách các danh mục
const categories = ["Tất cả", "Không gian", "Dịch vụ", "Sản phẩm", "Kết quả"];

export default function GalleryPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-[100dvh] flex-col bg-[#FFFDF5] font-['Roboto',sans-serif]">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-white overflow-hidden">
            <div className="container px-4 md:px-6">
              <AnimatedSection
                direction="up"
                className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="inline-block rounded-lg bg-[#FFF9E0] px-3 py-1 text-sm text-[#fdc700]"
                  >
                    Thư Viện Ảnh
                  </motion.div>
                  <AnimatedText
                    text="Khám Phá Không Gian & Dịch Vụ"
                    className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#5D5D5D]"
                    duration={0.03}
                  />
                  <AnimatedSection delay={0.3} direction="none">
                    <p className="max-w-[900px] text-[#5D5D5D] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Hình ảnh chân thực về không gian, dịch vụ và kết quả điều
                      trị tại KimSkin
                    </p>
                  </AnimatedSection>
                </div>
              </AnimatedSection>

              <Gallery items={galleryItems} categories={categories} />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

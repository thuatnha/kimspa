"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { AnimatedText } from "@/components/animated-text";
import { ServiceCard } from "@/components/service-card";
import { ServiceFilter } from "@/components/service-filter";
import type { Service, ServiceCategory } from "@/types/service-types";
import Header from "@/components/share/header";
import Footer from "@/components/share/footer";

// Danh sách các danh mục dịch vụ
const categories: ServiceCategory[] = [
  { id: "all", name: "Tất cả" },
  { id: "face", name: "Chăm sóc da mặt" },
  { id: "body", name: "Chăm sóc cơ thể" },
  { id: "massage", name: "Massage" },
  { id: "treatment", name: "Điều trị chuyên sâu" },
  { id: "package", name: "Gói dịch vụ" },
];

// Danh sách các dịch vụ
const services: Service[] = [
  {
    id: "1",
    title: "Trẻ Hóa Da Mặt RF",
    description:
      "Liệu trình sử dụng công nghệ RF Thermage giúp kích thích sản sinh collagen, làm săn chắc và trẻ hóa làn da.",
    price: 1500000,
    duration: 60,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "face",
    featured: true,
    benefits: [
      "Làm săn chắc da",
      "Giảm nếp nhăn",
      "Cải thiện đường nét khuôn mặt",
      "Kích thích sản sinh collagen",
    ],
  },
  {
    id: "2",
    title: "Điều Trị Nám Chuyên Sâu",
    description:
      "Liệu trình điều trị nám sử dụng công nghệ laser kết hợp với các sản phẩm đặc trị giúp làm mờ và ngăn ngừa nám tái phát.",
    price: 2200000,
    duration: 75,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "treatment",
    featured: true,
    benefits: [
      "Làm mờ vết nám",
      "Cân bằng sắc tố da",
      "Ngăn ngừa nám tái phát",
      "Làm sáng da tự nhiên",
    ],
  },
  {
    id: "3",
    title: "Massage Thụy Điển",
    description:
      "Kỹ thuật massage truyền thống giúp thư giãn cơ bắp, giảm căng thẳng và cải thiện tuần hoàn máu.",
    price: 850000,
    duration: 90,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "massage",
    featured: true,
    benefits: [
      "Giảm căng thẳng",
      "Thư giãn cơ bắp",
      "Cải thiện tuần hoàn máu",
      "Tăng cường sức khỏe tinh thần",
    ],
  },
  {
    id: "4",
    title: "Tẩy Tế Bào Chết Toàn Thân",
    description:
      "Loại bỏ tế bào chết trên da bằng các thành phần tự nhiên, giúp da mềm mịn và sáng hơn.",
    price: 750000,
    duration: 45,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "body",
    featured: false,
    benefits: [
      "Loại bỏ tế bào chết",
      "Làm mềm mịn da",
      "Kích thích tái tạo da",
      "Cải thiện kết cấu da",
    ],
  },
  {
    id: "5",
    title: "Chăm Sóc Da Cơ Bản",
    description:
      "Liệu trình làm sạch sâu, tẩy tế bào chết và dưỡng ẩm giúp da khỏe mạnh và rạng rỡ.",
    price: 650000,
    duration: 60,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "face",
    featured: false,
    benefits: [
      "Làm sạch sâu",
      "Cấp ẩm cho da",
      "Cân bằng độ pH",
      "Làm dịu da kích ứng",
    ],
  },
  {
    id: "6",
    title: "Điều Trị Mụn Chuyên Sâu",
    description:
      "Liệu trình điều trị mụn toàn diện, từ làm sạch sâu đến sử dụng công nghệ ánh sáng sinh học tiêu diệt vi khuẩn gây mụn.",
    price: 1200000,
    duration: 75,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "treatment",
    featured: false,
    benefits: [
      "Giảm viêm sưng",
      "Tiêu diệt vi khuẩn gây mụn",
      "Ngăn ngừa mụn tái phát",
      "Làm mờ vết thâm sau mụn",
    ],
  },
  {
    id: "7",
    title: "Massage Đá Nóng",
    description:
      "Kỹ thuật massage sử dụng đá bazan nóng giúp thư giãn cơ bắp sâu và cải thiện lưu thông máu.",
    price: 950000,
    duration: 90,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "massage",
    featured: false,
    benefits: [
      "Thư giãn cơ bắp sâu",
      "Giảm đau nhức",
      "Cải thiện lưu thông máu",
      "Giải tỏa căng thẳng",
    ],
  },
  {
    id: "8",
    title: "Tắm Trắng Cao Cấp",
    description:
      "Liệu trình tắm trắng sử dụng các thành phần tự nhiên giúp làm sáng da, mờ thâm và đều màu da.",
    price: 1800000,
    duration: 120,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "body",
    featured: false,
    benefits: [
      "Làm sáng da tự nhiên",
      "Mờ vết thâm",
      "Đều màu da",
      "Dưỡng ẩm sâu",
    ],
  },
  {
    id: "9",
    title: "Gói VIP Toàn Diện",
    description:
      "Trải nghiệm spa toàn diện bao gồm chăm sóc da mặt, massage toàn thân và các liệu trình đặc biệt.",
    price: 3500000,
    duration: 180,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "package",
    featured: true,
    benefits: [
      "Chăm sóc da mặt cao cấp",
      "Massage toàn thân",
      "Tẩy tế bào chết",
      "Đắp mặt nạ vàng 24K",
      "Tặng bộ sản phẩm dưỡng da",
    ],
  },
  {
    id: "10",
    title: "Gói Cặp Đôi",
    description:
      "Liệu trình spa dành cho cặp đôi, bao gồm massage thư giãn và chăm sóc da mặt trong không gian riêng tư.",
    price: 2500000,
    duration: 120,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "package",
    featured: false,
    benefits: [
      "Massage cặp đôi",
      "Chăm sóc da mặt",
      "Tẩy tế bào chết",
      "Đồ uống đặc biệt",
      "Không gian riêng tư",
    ],
  },
  {
    id: "11",
    title: "Liệu Trình Detox Da",
    description:
      "Loại bỏ độc tố và tạp chất trên da, giúp da sạch sẽ, thông thoáng và khỏe mạnh hơn.",
    price: 1100000,
    duration: 90,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "face",
    featured: false,
    benefits: [
      "Loại bỏ độc tố",
      "Làm sạch sâu lỗ chân lông",
      "Cân bằng dầu nhờn",
      "Ngăn ngừa mụn",
    ],
  },
  {
    id: "12",
    title: "Massage Bầu",
    description:
      "Kỹ thuật massage đặc biệt dành cho phụ nữ mang thai, giúp giảm đau lưng, phù chân và cải thiện giấc ngủ.",
    price: 900000,
    duration: 60,
    image: "/placeholder.svg?height=400&width=600",
    categoryId: "massage",
    featured: false,
    benefits: [
      "Giảm đau lưng",
      "Giảm phù chân",
      "Cải thiện giấc ngủ",
      "An toàn cho mẹ và bé",
    ],
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Lọc dịch vụ theo danh mục
  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.categoryId === activeCategory);

  return (
    <>
      <Header />
      <div className="flex min-h-[100dvh] flex-col bg-[#FFFDF5] font-['Roboto',sans-serif]">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-white overflow-hidden">
            <div className="container px-4 md:px-6">
              {/* Header */}
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
                    Dịch Vụ
                  </motion.div>
                  <AnimatedText
                    text="Khám Phá Các Dịch Vụ Của Chúng Tôi"
                    className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#5D5D5D]"
                    duration={0.03}
                  />
                  <AnimatedSection delay={0.3} direction="none">
                    <p className="max-w-[900px] text-[#5D5D5D] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      KimSkin Clinic mang đến những liệu trình chăm sóc sắc đẹp
                      cao cấp, được thiết kế riêng cho từng nhu cầu của khách
                      hàng.
                    </p>
                  </AnimatedSection>
                </div>
              </AnimatedSection>

              {/* Filter */}
              <ServiceFilter
                categories={categories}
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />

              {/* Services Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                  hidden: {},
                }}
              >
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </motion.div>

              {/* Empty State */}
              {filteredServices.length === 0 && (
                <AnimatedSection direction="up" className="text-center py-20">
                  <p className="text-[#5D5D5D] text-lg">
                    Không tìm thấy dịch vụ nào trong danh mục này. Vui lòng thử
                    danh mục khác.
                  </p>
                </AnimatedSection>
              )}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

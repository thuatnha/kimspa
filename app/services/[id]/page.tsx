"use client"

import { useState, useEffect } from "react"
import { useParams, notFound } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { CheckCircle2, Clock, ArrowLeft, Star } from "lucide-react"
import type { Service } from "@/types/service-types"

// Danh sách các dịch vụ (giống như trong services/page.tsx)
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
    benefits: ["Làm săn chắc da", "Giảm nếp nhăn", "Cải thiện đường nét khuôn mặt", "Kích thích sản sinh collagen"],
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
    benefits: ["Làm mờ vết nám", "Cân bằng sắc tố da", "Ngăn ngừa nám tái phát", "Làm sáng da tự nhiên"],
  },
  // Thêm các dịch vụ khác tương tự như trong services/page.tsx
]

// Thông tin chi tiết bổ sung cho trang chi tiết dịch vụ
const serviceDetails: Record<string, any> = {
  "1": {
    fullDescription:
      "Liệu trình Trẻ Hóa Da Mặt RF sử dụng công nghệ RF Thermage tiên tiến từ Hoa Kỳ, giúp kích thích sản sinh collagen, làm săn chắc và trẻ hóa làn da. Công nghệ này tạo ra năng lượng nhiệt tác động sâu vào lớp hạ bì, nơi sản sinh collagen, giúp làn da trẻ hóa từ bên trong mà không cần phẫu thuật. Kết quả là làn da săn chắc, giảm nếp nhăn và đường nét khuôn mặt được cải thiện rõ rệt.",
    steps: [
      "Tư vấn và phân tích tình trạng da",
      "Làm sạch da chuyên sâu",
      "Áp dụng công nghệ RF Thermage",
      "Đắp mặt nạ làm dịu và dưỡng ẩm",
      "Thoa serum và kem dưỡng đặc trị",
    ],
    results: [
      "Làn da săn chắc và đàn hồi hơn",
      "Giảm rõ rệt nếp nhăn và dấu hiệu lão hóa",
      "Đường nét khuôn mặt được nâng cơ tự nhiên",
      "Làn da tươi sáng và khỏe mạnh hơn",
    ],
    recommendations: "Liệu trình khuyến nghị: 6-8 buổi, mỗi buổi cách nhau 2 tuần để đạt hiệu quả tối ưu.",
    testimonials: [
      {
        name: "Nguyễn Thị Minh",
        age: 42,
        comment:
          "Sau 6 buổi điều trị, làn da của tôi đã thay đổi rõ rệt. Các nếp nhăn giảm hẳn và da săn chắc hơn nhiều. Tôi rất hài lòng với kết quả!",
      },
      {
        name: "Trần Thanh Hà",
        age: 38,
        comment:
          "Tôi đã thử nhiều phương pháp trẻ hóa da nhưng RF Thermage tại KimSkin Clinic là hiệu quả nhất. Chỉ sau 4 buổi, bạn bè đã nhận ra sự thay đổi tích cực trên làn da của tôi.",
      },
    ],
  },
  "2": {
    fullDescription:
      "Liệu trình Điều Trị Nám Chuyên Sâu sử dụng công nghệ laser kết hợp với các sản phẩm đặc trị giúp làm mờ và ngăn ngừa nám tái phát. Phương pháp này tác động trực tiếp vào các vùng da bị nám, phá vỡ hắc tố melanin và kích thích quá trình tái tạo da mới, khỏe mạnh. Đồng thời, các sản phẩm đặc trị giúp ức chế quá trình sản sinh melanin, ngăn ngừa nám tái phát.",
    steps: [
      "Tư vấn và phân tích tình trạng nám",
      "Làm sạch da chuyên sâu",
      "Áp dụng công nghệ laser điều trị nám",
      "Đắp mặt nạ làm dịu và dưỡng trắng",
      "Thoa serum đặc trị nám và kem chống nắng",
    ],
    results: [
      "Làm mờ vết nám rõ rệt",
      "Da sáng đều màu hơn",
      "Ngăn ngừa nám tái phát",
      "Làn da khỏe mạnh và tươi sáng",
    ],
    recommendations: "Liệu trình khuyến nghị: 8-10 buổi, mỗi buổi cách nhau 2 tuần để đạt hiệu quả tối ưu.",
    testimonials: [
      {
        name: "Lê Thị Hương",
        age: 35,
        comment:
          "Tôi đã bị nám sau sinh và đã thử nhiều phương pháp nhưng không hiệu quả. Sau khi điều trị tại KimSkin Clinic, các vết nám đã mờ đi rõ rệt. Tôi rất hài lòng với kết quả này!",
      },
      {
        name: "Phạm Thị Lan",
        age: 40,
        comment:
          "Liệu trình điều trị nám tại đây thực sự hiệu quả. Sau 6 buổi, làn da của tôi đã sáng và đều màu hơn rất nhiều. Các chuyên viên rất tận tâm và chuyên nghiệp.",
      },
    ],
  },
}

export default function ServiceDetailPage() {
  const params = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [details, setDetails] = useState<any | null>(null)

  useEffect(() => {
    if (params.id) {
      const foundService = services.find((s) => s.id === params.id)
      if (foundService) {
        setService(foundService)
        setDetails(serviceDetails[params.id as string] || null)
      } else {
        notFound()
      }
    }
  }, [params.id])

  if (!service) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[#FFFDF5]">
        <div className="text-center">
          <p className="text-[#5D5D5D] text-lg">Đang tải...</p>
        </div>
      </div>
    )
  }

  // Format price to VND
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(service.price)

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#FFFDF5] font-['Roboto',sans-serif]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white overflow-hidden">
          <div className="container px-4 md:px-6">
            {/* Back button */}
            <AnimatedSection direction="up" className="mb-8">
              <Link href="/services">
                <Button
                  variant="ghost"
                  className="text-[#5D5D5D] hover:text-[#fdc700] hover:bg-[#FFF9E0] transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại tất cả dịch vụ
                </Button>
              </Link>
            </AnimatedSection>

            {/* Service Header */}
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <AnimatedSection direction="right" className="relative">
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {service.featured && (
                    <div className="absolute top-4 right-4 bg-[#fdc700] text-black px-3 py-1 rounded-md text-sm font-medium">
                      Nổi bật
                    </div>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection direction="left" className="flex flex-col space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#5D5D5D] mb-2">{service.title}</h1>
                  <div className="flex items-center text-[#5D5D5D] mb-4">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{service.duration} phút</span>
                  </div>
                  <p className="text-[#5D5D5D] text-lg">{service.description}</p>
                </div>

                <div className="bg-[#FFF9E0] p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-[#5D5D5D] mb-4">Lợi ích</h2>
                  <ul className="grid gap-3">
                    {service.benefits.map((benefit, i) => (
                      <motion.li
                        key={benefit}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                      >
                        <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                          <CheckCircle2 className="h-5 w-5 text-[#fdc700]" />
                        </motion.div>
                        <span className="text-[#5D5D5D]">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#5D5D5D]">{formattedPrice}</span>
                  </div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link href={`/booking?service=${service.id}`}>
                      <Button className="w-full bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors text-lg py-6">
                        Đặt Lịch Ngay
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>

            {/* Service Details */}
            {details && (
              <div className="mt-16 grid gap-12">
                {/* Full Description */}
                <AnimatedSection direction="up" className="bg-white p-6 rounded-lg shadow-sm border border-[#FFF9E0]">
                  <h2 className="text-2xl font-semibold text-[#5D5D5D] mb-4">Mô tả chi tiết</h2>
                  <p className="text-[#5D5D5D] text-lg leading-relaxed">{details.fullDescription}</p>
                </AnimatedSection>

                {/* Steps */}
                <AnimatedSection direction="up" delay={0.1}>
                  <h2 className="text-2xl font-semibold text-[#5D5D5D] mb-6">Quy trình điều trị</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {details.steps.map((step: string, i: number) => (
                      <motion.div
                        key={i}
                        className="bg-[#FFFDF5] p-6 rounded-lg border border-[#FFF9E0]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center gap-4 mb-2">
                          <div className="h-8 w-8 rounded-full bg-[#fdc700] flex items-center justify-center text-black font-bold">
                            {i + 1}
                          </div>
                          <h3 className="font-medium text-[#5D5D5D]">Bước {i + 1}</h3>
                        </div>
                        <p className="text-[#5D5D5D]">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>

                {/* Results */}
                <AnimatedSection direction="up" delay={0.2}>
                  <h2 className="text-2xl font-semibold text-[#5D5D5D] mb-6">Kết quả mong đợi</h2>
                  <div className="bg-[#FFF9E0] p-6 rounded-lg">
                    <ul className="grid gap-4 md:grid-cols-2">
                      {details.results.map((result: string, i: number) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                            <CheckCircle2 className="h-5 w-5 text-[#fdc700]" />
                          </motion.div>
                          <span className="text-[#5D5D5D]">{result}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 p-4 bg-[#FFFDF5] border-l-4 border-[#fdc700] rounded">
                    <p className="text-[#5D5D5D] italic">{details.recommendations}</p>
                  </div>
                </AnimatedSection>

                {/* Testimonials */}
                <AnimatedSection direction="up" delay={0.3}>
                  <h2 className="text-2xl font-semibold text-[#5D5D5D] mb-6">Đánh giá từ khách hàng</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {details.testimonials.map((testimonial: any, i: number) => (
                      <motion.div
                        key={i}
                        className="bg-[#FFFDF5] p-6 rounded-lg border border-[#FFF9E0]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-12 w-12 rounded-full bg-[#FFF9E0] flex items-center justify-center">
                            <Image
                              src="/placeholder.svg?height=48&width=48"
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#5D5D5D]">{testimonial.name}</h3>
                            <p className="text-sm text-[#fdc700]">{testimonial.age} tuổi</p>
                          </div>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-[#fdc700] text-[#fdc700]" />
                          ))}
                        </div>
                        <p className="text-[#5D5D5D] italic">"{testimonial.comment}"</p>
                      </motion.div>
                    ))}
                  </div>
                </AnimatedSection>

                {/* CTA */}
                <AnimatedSection direction="up" delay={0.4} className="text-center py-8">
                  <h2 className="text-2xl font-semibold text-[#5D5D5D] mb-4">Trải nghiệm ngay hôm nay</h2>
                  <p className="text-[#5D5D5D] mb-6 max-w-2xl mx-auto">
                    Đặt lịch ngay hôm nay để trải nghiệm dịch vụ {service.title} và nhận ưu đãi đặc biệt dành cho khách
                    hàng mới.
                  </p>
                  <motion.div className="inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href={`/booking?service=${service.id}`}>
                      <Button className="bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors text-lg px-8 py-6">
                        Đặt Lịch Ngay
                      </Button>
                    </Link>
                  </motion.div>
                </AnimatedSection>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

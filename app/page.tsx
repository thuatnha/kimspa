"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronRight, Menu, X, Star, Instagram, Facebook, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedText } from "@/components/animated-text"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedImage } from "@/components/animated-image"
import { GallerySection } from "@/components/gallery-section"
import { PriceCarousel } from "@/components/price-carousel"
import { motion, useScroll, useSpring } from "framer-motion"
import Header from "@/components/share/header"
import Footer from "@/components/share/footer"

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#FFFDF5] font-['Roboto',sans-serif]">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#fdc700] z-50 origin-left" style={{ scaleX }} />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <BenefitsSection />
        <GallerySection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#FFFDF5] overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <AnimatedSection direction="right" className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <AnimatedText
                text="Tái Sinh Làn Da"
                as="h1"
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#5D5D5D]"
                duration={0.03}
              />
              <AnimatedText
                text="Khơi Nguồn Vẻ Đẹp"
                as="h1"
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#fdc700]"
                duration={0.03}
                delay={0.5}
              />
              <AnimatedSection delay={0.8} direction="none">
                <p className="max-w-[600px] text-[#5D5D5D] md:text-xl/relaxed">
                  Với công nghệ chăm sóc da tiên tiến, liệu trình tại Kim Skin Clinic giúp bạn thư giãn, trẻ
                  hóa làn da chỉ sau 60 phút điều trị.
                </p>
              </AnimatedSection>
            </div>
            <AnimatedSection delay={1} direction="up">
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="px-8 bg-[#fdc700] hover:bg-[#e3b400] text-black transition-all duration-300"
                  >
                    Đặt Lịch Ngay
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 text-[#fdc700] border-[#fdc700] hover:bg-[#FFF9E0] transition-colors"
                  >
                    Tư Vấn Miễn Phí
                  </Button>
                </motion.div>
              </div>
            </AnimatedSection>
            {/* <AnimatedSection delay={1.2} direction="up">
              <div className="flex items-center space-x-4 text-sm pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                    >
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt={`Avatar ${i}`}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-[#FFFDF5]"
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="text-[#5D5D5D]">
                  <AnimatedCounter
                    from={0}
                    to={1500}
                    prefix=""
                    suffix="+"
                    className="font-medium text-[#fdc700]"
                    delay={1.5}
                  />{" "}
                  khách hàng hài lòng
                </div>
              </div>
            </AnimatedSection> */}
          </AnimatedSection>
          <AnimatedSection direction="left" delay={0.3} className="flex items-center justify-center">
            <AnimatedImage
              src="https://salt.tkbcdn.com/ts/ds/ff/bb/f9/c64733c3d4cdd915199f96342b38bf6c.png"
              alt="Spa Treatment"
              width={550}
              height={450}
              // className="rounded-lg object-cover shadow-lg"
              // className="object-cover"
              effect="zoom"
              delay={0.5}
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container px-4 md:px-6">
        <AnimatedSection direction="up" className="flex flex-col items-center justify-center space-y-4 text-center">
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
              text="Trải Nghiệm Dịch Vụ Đẳng Cấp"
              className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#5D5D5D]"
              duration={0.03}
            />
            <AnimatedSection delay={0.3} direction="none">
              <p className="max-w-[900px] text-[#5D5D5D] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                KimSkin Clinic mang đến những liệu trình chăm sóc da cao cấp, được thiết kế riêng cho từng loại da.
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          {[
            {
              title: "Trẻ Hóa Da Mặt",
              description: "Liệu trình chuyên sâu giúp làn da trẻ trung, căng mịn và rạng rỡ.",
              features: ["Căng Bóng, Trẻ Hóa Da", "Thải Độc Corticoid", "Cấy Collagen Tươi", "Detox Làm Sạch Sâu", "Thải Độc, Làm Sạch Sâu Mandelic"],
            },
            {
              title: "Điều Trị Nám Sâu",
              description: "Giải pháp toàn diện cho làn da không đều màu, nám và tàn nhang.",
              features: ["Điện Di Vitamin C Sáng Da", "Laser Trị Nám Tầng Sâu", "Peel Da Sinh Học Trị Nám", "Kích thích collagen, cải thiện da"],
            },
            {
              title: "Thải độc cơ thể",
              description: "Kết hợp kỹ thuật massage truyền thống và hiện đại giúp thư giãn toàn thân.",
              features: ["Thải Độc Cơ Thể Bằng Hồng Ngoại", "Thải Độc Da – Giảm Mụn, Sáng Da", "Thải Độc Gan – Thanh Lọc Cơ Thể",  "Thải Độc Đường Ruột", "Thải Độc Toàn Thân Chuyên Sâu"],
            },
          ].map((service, index) => (
            <AnimatedSection key={service.title} direction="up" delay={0.2 * index} className="h-full">
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className={`border-${index === 1 ? "[#fdc700]" : "[#FFF9E0]"} bg-[#FFFDF5] h-full`}>
                  <CardHeader>
                    <motion.div
                      className="h-14 w-14 rounded-full bg-[#FFF9E0] flex items-center justify-center mb-4"
                      whileHover={{ scale: 1.1, backgroundColor: "#fdc700" }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt={service.title}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </motion.div>
                    <CardTitle className="text-[#fdc700]">{service.title}</CardTitle>
                    <CardDescription className="text-[#5D5D5D]">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-2">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                            <CheckCircle2 className="h-4 w-4 text-[#fdc700]" />
                          </motion.div>
                          <span className="text-sm text-[#5D5D5D]">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button className="w-full bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors">
                        Tìm Hiểu Thêm
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitsSection() {
  return (
    <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-[#FFF9E0] overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <AnimatedSection direction="right" className="flex items-center justify-center">
            <AnimatedImage
              src="https://salt.tkbcdn.com/ts/ds/f4/56/5a/4a43c390ae73a3d6a0026984e3a754f6.jpg"
              alt="Spa Benefits"
              width={550}
              height={450}
              className="rounded-lg object-cover shadow-lg"
              effect="zoom"
            />
          </AnimatedSection>
          <AnimatedSection direction="left" className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-[#fdc700]"
              >
                Lợi Ích
              </motion.div>
              <AnimatedText
                text="Tại Sao Chọn KimSkin Clinic?"
                className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#5D5D5D]"
                duration={0.03}
              />
              <AnimatedSection delay={0.3} direction="none">
                <p className="max-w-[600px] text-[#5D5D5D] md:text-xl/relaxed">
                  Chúng tôi cam kết mang đến trải nghiệm spa cao cấp và kết quả vượt trội cho mọi khách hàng.
                </p>
              </AnimatedSection>
            </div>
            <div className="grid gap-4">
              {[
                {
                  title: "Chuyên Gia Hàng Đầu",
                  description:
                    "Đội ngũ chuyên gia của chúng tôi được đào tạo bài bản , với nhiều kinh nghiệm.",
                },
                {
                  title: "Công Nghệ Tiên Tiến",
                  description:
                    "Sử dụng các thiết bị và công nghệ hiện đại nhất, đảm bảo hiệu quả và an toàn.",
                },
                {
                  title: "Sản Phẩm Cao Cấp",
                  description:
                    "Chỉ sử dụng các sản phẩm organic, không paraben, được nhập khẩu trực tiếp từ các thương hiệu hàng đầu.",
                },
                {
                  title: "Không Gian Sang Trọng",
                  description: "Thiết kế nội thất tinh tế, không gian riêng tư và yên tĩnh giúp bạn thư giãn tối đa.",
                },
              ].map((benefit, index) => (
                <AnimatedSection key={benefit.title} direction="left" delay={0.2 + index * 0.1}>
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="h-10 w-10 rounded-full bg-white flex items-center justify-center shrink-0"
                      whileHover={{ scale: 1.1, backgroundColor: "#FFF9E0" }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <CheckCircle2 className="h-5 w-5 text-[#fdc700]" />
                      </motion.div>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#fdc700]">{benefit.title}</h3>
                      <p className="text-[#5D5D5D]">{benefit.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection delay={0.8} direction="up" className="pt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="px-8 bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors">
                  Khám Phá Thêm
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </AnimatedSection>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container px-4 md:px-6">
        <AnimatedSection direction="up" className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block rounded-lg bg-[#FFF9E0] px-3 py-1 text-sm text-[#fdc700]"
            >
              Đánh Giá
            </motion.div>
            <AnimatedText
              text="Khách Hàng Nói Gì Về Chúng Tôi"
              className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#5D5D5D]"
              duration={0.03}
            />
            <AnimatedSection delay={0.3} direction="none">
              <p className="max-w-[900px] text-[#5D5D5D] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hàng ngàn khách hàng đã tin tưởng và hài lòng với dịch vụ của KimSkin Clinic.
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          {[
            {
              name: "Nguyễn Thị Minh Tâm",
              role: "32 tuổi, Nhân viên văn phòng",
              testimonial:
                "Sau 3 lần điều trị nám tại KimSkin Clinic, làn da của tôi đã cải thiện rõ rệt. Các vết nám mờ đi đáng kể, da sáng và đều màu hơn. Chuyên viên rất tận tâm và chuyên nghiệp.",
            },
            {
              name: "Trần Thị Hương",
              role: "28 tuổi, Giáo viên",
              testimonial:
                "Tôi đã thử nhiều spa khác nhau nhưng KimSkin Clinic thực sự khác biệt. Không gian sang trọng, yên tĩnh và dịch vụ chăm sóc da mặt của họ thật sự hiệu quả. Làn da của tôi chưa bao giờ tốt như vậy!",
            },
            {
              name: "Lê Thị Thanh Hà",
              role: "41 tuổi, Doanh nhân",
              testimonial:
                "Với lịch trình bận rộn, việc dành thời gian cho bản thân là điều xa xỉ. Nhưng KimSkin Clinic đã giúp tôi thư giãn và trẻ hóa làn da. Liệu trình trẻ hóa da mặt thật sự hiệu quả, tôi trông trẻ hơn 5 tuổi!",
            },
          ].map((testimonial, index) => (
            <AnimatedSection key={testimonial.name} direction="up" delay={0.2 * index} className="h-full">
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className={`border-${index === 1 ? "[#fdc700]" : "[#FFF9E0]"} bg-[#FFFDF5] h-full`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <motion.div whileHover={{ scale: 1.1, rotate: 10 }} transition={{ duration: 0.3 }}>
                        <Image
                          src="/placeholder.svg?height=60&width=60"
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                      </motion.div>
                      <div>
                        <CardTitle className="text-[#5D5D5D]">{testimonial.name}</CardTitle>
                        <CardDescription className="text-[#fdc700]">{testimonial.role}</CardDescription>
                      </div>
                    </div>
                    <motion.div
                      className="flex pt-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          whileHover={{ scale: 1.2, rotate: 20 }}
                        >
                          <Star className="h-4 w-4 fill-[#fdc700] text-[#fdc700]" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <motion.p
                      className="text-[#5D5D5D]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      "{testimonial.testimonial}"
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-[#FFF9E0] overflow-hidden">
      <div className="container px-4 md:px-6">
        <AnimatedSection direction="up" className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-[#fdc700]"
            >
              Bảng Giá
            </motion.div>
            <AnimatedText
              text="Các Gói Dịch Vụ Của Chúng Tôi"
              className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#5D5D5D]"
              duration={0.03}
            />
            <AnimatedSection delay={0.3} direction="none">
              <p className="max-w-[900px] text-[#5D5D5D] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Lựa chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của bạn.
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        {/* Thay thế grid bằng carousel */}
        <div className="py-12">
          <PriceCarousel />
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container px-4 md:px-6">
        <AnimatedSection direction="up" className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <AnimatedText
              text="Đặt Lịch Ngay Hôm Nay"
              className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#5D5D5D]"
              duration={0.03}
            />
            <AnimatedSection delay={0.3} direction="none">
              <p className="max-w-[600px] text-[#5D5D5D] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Trải nghiệm dịch vụ spa đẳng cấp và tận hưởng làn da khỏe đẹp, rạng rỡ.
              </p>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.5} direction="up">
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="px-8 bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors">
                  Đặt Lịch Ngay
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 text-[#fdc700] border-[#fdc700] hover:bg-[#FFF9E0] transition-colors"
                >
                  Nhận Tư Vấn Miễn Phí
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.7} direction="up">
            <div className="mt-4 flex items-center justify-center space-x-4">
              <motion.div
                className="flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <CheckCircle2 className="h-4 w-4 text-[#fdc700]" />
                </motion.div>
                <span className="text-sm text-[#5D5D5D]">Giảm 20% cho lần đầu</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <CheckCircle2 className="h-4 w-4 text-[#fdc700]" />
                </motion.div>
                <span className="text-sm text-[#5D5D5D]">Tặng quà khi giới thiệu bạn bè</span>
              </motion.div>
            </div>
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </section>
  )
}
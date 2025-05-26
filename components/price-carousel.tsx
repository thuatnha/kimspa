"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PriceCard } from "@/components/price-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { AnimatedSection } from "@/components/animated-section"
import { cn } from "@/lib/utils"

interface PricePackage {
  id: string
  title: string
  price: number
  description: string
  features: string[]
  popular: boolean
  duration?: string
  category?: string
  color?: string
}

export function PriceCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)

  // Danh sách các gói dịch vụ
  const pricePackages: PricePackage[] = [
    {
      id: "basic",
      title: "Chăm Sóc Da Cơ Bản",
      price: 799000,
      description: "Phù hợp cho mọi người.",
      features: [
        "Căng bóng trẻ hóa da",
        "Massage mặt thư giãn",
        "Mặt nạ dưỡng ẩm cơ bản",
        "Tư vấn chăm sóc da tại nhà",
      ],
      popular: false,
      duration: "60 phút",
      category: "Chăm sóc da",
    },
    {
      id: "basic-1",
      title: "Thải độc cơ thể",
      price: 449000,
      description: "Thải độc tố, làm đẹp da, thư giãn cơ thể.",
      features: [
        "Thải độc cơ thể bằng hồng ngoại",
        "Công nghệ RF trẻ hóa da",
        "Serum đặc trị cao cấp",
        "Mặt nạ collagen Nhật Bản",
        "Tặng 1 sản phẩm dưỡng da mini",
      ],
      popular: true,
      duration: "90 phút",
      category: "Chăm sóc da",
    },
    // {
    //   id: "vip",
    //   title: "Gói VIP",
    //   price: 5900000,
    //   description: "Trải nghiệm spa đẳng cấp nhất.",
    //   features: [
    //     "Liệu trình toàn diện (120 phút)",
    //     "Công nghệ Hifu nâng cơ mặt",
    //     "Massage toàn thân thư giãn",
    //     "Mặt nạ vàng 24K",
    //     "Bộ sản phẩm dưỡng da cao cấp",
    //     "Đưa đón tận nơi (nội thành)",
    //   ],
    //   popular: false,
    //   duration: "120 phút",
    //   category: "Chăm sóc da",
    // },
    {
      id: "massage-relax",
      title: "Điều trị nám",
      price: 799000,
      description: "Giảm căng thẳng, thư giãn cơ bắp.",
      features: [
        "Điện di Vitamin C sáng da",
        "Tinh dầu thảo mộc cao cấp",
        "Kỹ thuật massage Thụy Điển",
        "Thư giãn với âm nhạc trị liệu",
      ],
      popular: false,
      duration: "60 phút",
      category: "Massage",
    },
    // {
    //   id: "hot-stone",
    //   title: "Massage Đá Nóng",
    //   price: 950000,
    //   description: "Thư giãn sâu với đá bazan nóng.",
    //   features: [
    //     "Massage đá nóng (90 phút)",
    //     "Đá bazan tự nhiên",
    //     "Tinh dầu thư giãn",
    //     "Giảm đau nhức cơ bắp",
    //     "Cải thiện tuần hoàn máu",
    //   ],
    //   popular: false,
    //   duration: "90 phút",
    //   category: "Massage",
    //   color: "#f59e0b",
    // },
    // {
    //   id: "facial-acne",
    //   title: "Điều Trị Mụn",
    //   price: 1200000,
    //   description: "Giải pháp toàn diện cho da mụn.",
    //   features: [
    //     "Làm sạch sâu (75 phút)",
    //     "Công nghệ ánh sáng sinh học",
    //     "Tinh chất kháng khuẩn",
    //     "Mặt nạ làm dịu da",
    //     "Tư vấn chế độ ăn uống",
    //   ],
    //   popular: false,
    //   duration: "75 phút",
    //   category: "Điều trị",
    // },
    // {
    //   id: "whitening",
    //   title: "Trắng Sáng Da",
    //   price: 1800000,
    //   description: "Cải thiện tông màu da, làm đều màu.",
    //   features: [
    //     "Liệu trình làm trắng (90 phút)",
    //     "Vitamin C liều cao",
    //     "Công nghệ ánh sáng",
    //     "Mặt nạ dưỡng trắng",
    //     "Kem chống nắng cao cấp",
    //   ],
    //   popular: false,
    //   duration: "90 phút",
    //   category: "Điều trị",
    // },
    // {
    //   id: "couple",
    //   title: "Gói Cặp Đôi",
    //   price: 2500000,
    //   description: "Trải nghiệm spa lãng mạn cho hai người.",
    //   features: [
    //     "Massage cặp đôi (120 phút)",
    //     "Không gian riêng tư",
    //     "Tinh dầu hoa hồng",
    //     "Trà thảo mộc & hoa quả",
    //     "Ngâm chân thảo dược",
    //   ],
    //   popular: false,
    //   duration: "120 phút",
    //   category: "Gói đặc biệt",
    //   color: "#ec4899",
    // },
    // {
    //   id: "detox",
    //   title: "Detox Toàn Thân",
    //   price: 2200000,
    //   description: "Thanh lọc cơ thể, loại bỏ độc tố.",
    //   features: [
    //     "Tẩy tế bào chết toàn thân",
    //     "Ủ khoáng detox (90 phút)",
    //     "Massage bạch huyết",
    //     "Xông hơi thảo dược",
    //     "Nước detox hoa quả",
    //   ],
    //   popular: false,
    //   duration: "90 phút",
    //   category: "Chăm sóc body",
    // },
    // {
    //   id: "monthly",
    //   title: "Gói Tháng",
    //   price: 8500000,
    //   description: "Chăm sóc toàn diện trong 30 ngày.",
    //   features: [
    //     "4 buổi chăm sóc da cơ bản",
    //     "2 buổi massage thư giãn",
    //     "1 buổi điều trị chuyên sâu",
    //     "Bộ sản phẩm dưỡng da cao cấp",
    //     "Tư vấn dinh dưỡng",
    //     "Ưu tiên đặt lịch",
    //   ],
    //   popular: false,
    //   duration: "30 ngày",
    //   category: "Gói đặc biệt",
    // },
  ]

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="relative">
      {/* <div className="overflow-hidden" ref={emblaRef}> */}
      <div className="" ref={emblaRef}>
        <div className="flex">
          {pricePackages.map((pkg, index) => (
            <div key={pkg.id} className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
              <AnimatedSection direction="up" delay={0.1 * (index % 3)} className="h-full">
                <PriceCard
                  title={pkg.title}
                  price={pkg.price}
                  description={pkg.description}
                  features={pkg.features}
                  popular={pkg.popular}
                  duration={pkg.duration}
                  category={pkg.category}
                  color={pkg.color}
                />
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-8 gap-4">
        <motion.div whileHover={{ scale: prevBtnEnabled ? 1.1 : 1 }} whileTap={{ scale: prevBtnEnabled ? 0.9 : 1 }}>
          <Button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            variant="outline"
            size="icon"
            className={cn(
              "rounded-full border-[#fdc700]",
              prevBtnEnabled
                ? "text-[#fdc700] hover:bg-[#FFF9E0] hover:text-[#fdc700]"
                : "text-[#5D5D5D]/30 border-[#5D5D5D]/30 cursor-not-allowed",
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: nextBtnEnabled ? 1.1 : 1 }} whileTap={{ scale: nextBtnEnabled ? 0.9 : 1 }}>
          <Button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            variant="outline"
            size="icon"
            className={cn(
              "rounded-full border-[#fdc700]",
              nextBtnEnabled
                ? "text-[#fdc700] hover:bg-[#FFF9E0] hover:text-[#fdc700]"
                : "text-[#5D5D5D]/30 border-[#5D5D5D]/30 cursor-not-allowed",
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === selectedIndex ? "bg-[#fdc700] w-6" : "bg-[#5D5D5D]/30 hover:bg-[#5D5D5D]/50",
            )}
          />
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedText } from "@/components/animated-text"
import Link from "next/link"
import Image from "next/image"

// Danh sách hình ảnh mẫu cho gallery section
const galleryItems = [
  {
    id: "1",
    src: "https://salt.tkbcdn.com/ts/ds/92/ee/a4/0f61c4460af654629792834641e8a19e.jpg",
    alt: "Không gian spa",
    title: "Không Gian Thư Giãn",
  },
  {
    id: "2",
    src: "https://salt.tkbcdn.com/ts/ds/9f/88/2f/66fc91594e6d3c89aedd7743b47a601f.jpg",
    alt: "Không gian spa",
    title: "Không Gian Thư Giãn",
  },
  {
    id: "3",
    src: "https://salt.tkbcdn.com/ts/ds/c3/5d/e4/5a93b1387ec433f0271b0936c53daf1c.jpg",
    alt: "Massage thư giãn",
    title: "Massage Thư Giãn",
  },
  {
    id: "4",
    src: "https://salt.tkbcdn.com/ts/ds/9d/02/13/9d0a40aeff1ce7fdc559a6a0ff188963.jpg",
    alt: "Phòng trị liệu",
    title: "Phòng trị liệu",
  },
  {
    id: "5",
    src: "https://salt.tkbcdn.com/ts/ds/e5/66/06/829bb22271df5fe54f00ff6e85aa4aa6.jpg",
    alt: "Phòng trị liệu",
    title: "Phòng trị liệu",
  },
  {
    id: "6",
    src: "https://salt.tkbcdn.com/ts/ds/cc/c6/91/5a4ca243c3fd0ed2bbf4af3e39505245.jpg",
    alt: "Phòng trị liệu",
    title: "Phòng Trị Liệu",
  },
]

export function GallerySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-[#FFF9E0] overflow-hidden">
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
              className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-[#fdc700]"
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
                Hình ảnh chân thực về không gian, dịch vụ và kết quả điều trị tại KimSkin Clinic
              </p>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
            hidden: {},
          }}
        >
          {galleryItems.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-lg aspect-square cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ scale: 1.03 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />

              {/* Overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="text-white text-center p-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: hoveredIndex === index ? 0 : 20,
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* <AnimatedSection delay={0.5} direction="up" className="flex justify-center mt-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/gallery">
              <Button className="px-8 bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors">
                Xem Thêm Hình Ảnh
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                >
                  <ChevronRight className="ml-2 h-4 w-4" />
                </motion.div>
              </Button>
            </Link>
          </motion.div>
        </AnimatedSection> */}
      </div>
    </section>
  )
}

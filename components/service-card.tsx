"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Service } from "@/types/service-types"

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  // Format price to VND
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(service.price)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className={`h-full border-[#FFF9E0] ${service.featured ? "border-[#fdc700]" : ""} bg-[#FFFDF5]`}>
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {service.featured && (
            <div className="absolute top-2 right-2 bg-[#fdc700] text-black px-2 py-1 rounded-md text-xs font-medium">
              Nổi bật
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#fdc700]">{service.title}</CardTitle>
          </div>
          <div className="flex items-center text-[#5D5D5D] text-sm mt-1">
            <Clock className="h-4 w-4 mr-1" />
            <span>{service.duration} phút</span>
          </div>
          <CardDescription className="text-[#5D5D5D]">{service.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <h4 className="font-medium text-[#5D5D5D] mb-2">Lợi ích:</h4>
          <ul className="grid gap-2">
            {service.benefits.slice(0, 4).map((benefit, i) => (
              <motion.li
                key={benefit}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.3 }}>
                  <CheckCircle2 className="h-4 w-4 text-[#fdc700]" />
                </motion.div>
                <span className="text-sm text-[#5D5D5D]">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="w-full flex items-center justify-between">
            <span className="text-xl font-bold text-[#5D5D5D]">{formattedPrice}</span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={`/services/${service.id}`}>
                <Button variant="outline" className="text-[#fdc700] border-[#fdc700] hover:bg-[#FFF9E0]">
                  Chi tiết
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div className="w-full" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href={`/booking?service=${service.id}`} className="w-full">
              <Button className="w-full bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors">
                Đặt Lịch Ngay
              </Button>
            </Link>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

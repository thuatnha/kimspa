"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface PriceCardProps {
  title: string
  price: number
  description: string
  features: string[]
  popular?: boolean
  duration?: string
  category?: string
  color?: string
}

export function PriceCard({
  title,
  price,
  description,
  features,
  popular = false,
  duration,
  category,
  color,
}: PriceCardProps) {
  // Format price to VND
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price)

  return (
    <motion.div whileHover={{ y: -10, scale: 1.02 }} transition={{ duration: 0.3 }} className="h-full">
      <Card className={`${popular ? "border-2 border-[#fdc700]" : "border-[#FFF9E0]"} bg-white h-full relative`}>
        {popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#fdc700] text-black px-4 py-1 rounded-full text-sm font-medium">
            Phổ Biến Nhất
          </div>
        )}

        <CardHeader className={popular ? "pt-8" : ""}>
          {category && (
            <div
              className="inline-block rounded-full px-2 py-0.5 text-xs font-medium mb-2"
              style={{
                backgroundColor: color ? `${color}20` : "#FFF9E0",
                color: color || "#fdc700",
              }}
            >
              {category}
            </div>
          )}
          <CardTitle className="text-[#fdc700]">{title}</CardTitle>
          <motion.div
            className="flex items-baseline gap-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-3xl font-bold text-[#5D5D5D]">{formattedPrice}</span>
            {duration && <span className="text-[#5D5D5D]">/{duration}</span>}
          </motion.div>
          <CardDescription className="text-[#5D5D5D]">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2">
            {features.map((feature, i) => (
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
          <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {/* <Link href="/booking" className="w-full block">
              <Button className="w-full bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors">
                Đặt Lịch Ngay
              </Button>
            </Link> */}
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

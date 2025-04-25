"use client"

import { motion } from "framer-motion"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { CheckCircle2, Calendar, Clock, User, Phone, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Service } from "@/types/service-types"

interface BookingSuccessProps {
  formData: {
    serviceId: string
    date?: Date
    timeSlot: string
    firstName: string
    lastName: string
    phone: string
    email: string
    notes: string
  }
  selectedService?: Service
}

export function BookingSuccess({ formData, selectedService }: BookingSuccessProps) {
  // Generate a random booking reference
  const bookingReference = `SPA-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <AnimatedSection direction="up" className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-20 h-20 bg-[#fdc700]/20 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="h-10 w-10 text-[#fdc700]" />
      </motion.div>

      <h2 className="text-2xl font-bold text-[#5D5D5D] mb-2">Đặt Lịch Thành Công!</h2>
      <p className="text-[#5D5D5D] mb-8">
        Cảm ơn bạn đã đặt lịch tại KimSkin Clinic. Chúng tôi sẽ liên hệ với bạn để xác nhận lịch hẹn.
      </p>

      <div className="bg-[#FFF9E0] p-6 rounded-lg mb-8">
        <h3 className="font-medium text-[#5D5D5D] mb-4 text-lg">Chi tiết đặt lịch</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-[#fdc700] mt-0.5" />
            <div>
              <p className="text-sm text-[#5D5D5D]/70">Ngày</p>
              <p className="text-[#5D5D5D] font-medium">
                {formData.date ? format(formData.date, "EEEE, dd/MM/yyyy", { locale: vi }) : ""}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-[#fdc700] mt-0.5" />
            <div>
              <p className="text-sm text-[#5D5D5D]/70">Giờ</p>
              <p className="text-[#5D5D5D] font-medium">{formData.timeSlot}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-[#fdc700] mt-0.5" />
            <div>
              <p className="text-sm text-[#5D5D5D]/70">Khách hàng</p>
              <p className="text-[#5D5D5D] font-medium">
                {formData.lastName} {formData.firstName}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-[#fdc700] mt-0.5" />
            <div>
              <p className="text-sm text-[#5D5D5D]/70">Số điện thoại</p>
              <p className="text-[#5D5D5D] font-medium">{formData.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 md:col-span-2">
            <Mail className="h-5 w-5 text-[#fdc700] mt-0.5" />
            <div>
              <p className="text-sm text-[#5D5D5D]/70">Email</p>
              <p className="text-[#5D5D5D] font-medium">{formData.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#fdc700]/20">
          <div className="flex items-start gap-3">
            <div>
              <p className="text-sm text-[#5D5D5D]/70">Dịch vụ</p>
              <p className="text-[#5D5D5D] font-medium">{selectedService?.title}</p>
            </div>
          </div>

          {formData.notes && (
            <div className="mt-4">
              <p className="text-sm text-[#5D5D5D]/70">Ghi chú</p>
              <p className="text-[#5D5D5D]">{formData.notes}</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#fdc700]/20 flex justify-between items-center">
            <div>
              <p className="text-sm text-[#5D5D5D]/70">Mã đặt lịch</p>
              <p className="text-[#fdc700] font-bold">{bookingReference}</p>
            </div>

            {selectedService && (
              <div className="text-right">
                <p className="text-sm text-[#5D5D5D]/70">Tổng thanh toán</p>
                <p className="text-[#5D5D5D] font-bold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    minimumFractionDigits: 0,
                  }).format(selectedService.price)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/">
            <Button className="bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors">Quay Về Trang Chủ</Button>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/services">
            <Button variant="outline" className="border-[#fdc700] text-[#5D5D5D] hover:bg-[#FFF9E0]">
              Xem Thêm Dịch Vụ
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

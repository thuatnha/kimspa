"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedSection } from "@/components/animated-section"
import { TimeSlotPicker } from "@/components/time-slot-picker"
import { ServiceSelector } from "@/components/service-selector"
import { BookingSuccess } from "@/components/booking-success"
import { cn } from "@/lib/utils"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Service } from "@/types/service-types"

interface BookingFormProps {
  selectedServiceId?: string
  services: Service[]
}

export function BookingForm({ selectedServiceId, services }: BookingFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    serviceId: selectedServiceId || "",
    date: undefined as Date | undefined,
    timeSlot: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  })

  // Validation state
  const [errors, setErrors] = useState({
    serviceId: "",
    date: "",
    timeSlot: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  })

  const handleServiceChange = (serviceId: string) => {
    setFormData({ ...formData, serviceId })
    setErrors({ ...errors, serviceId: "" })
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData({ ...formData, date })
    setErrors({ ...errors, date: "" })
  }

  const handleTimeSlotChange = (timeSlot: string) => {
    setFormData({ ...formData, timeSlot })
    setErrors({ ...errors, timeSlot: "" })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }

  const validateStep1 = () => {
    const newErrors = { ...errors }
    let isValid = true

    if (!formData.serviceId) {
      newErrors.serviceId = "Vui lòng chọn dịch vụ"
      isValid = false
    }

    if (!formData.date) {
      newErrors.date = "Vui lòng chọn ngày"
      isValid = false
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = "Vui lòng chọn giờ"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const validateStep2 = () => {
    const newErrors = { ...errors }
    let isValid = true

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Vui lòng nhập tên"
      isValid = false
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Vui lòng nhập họ"
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại"
      isValid = false
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = "Email không hợp lệ"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    }
  }

  const handlePrevStep = () => {
    setStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 2 && validateStep2()) {
      setIsSubmitting(true)

      // Simulate API call
      try {
        let formattedDateForApi = null;
        if(formData.date && formData.timeSlot) {
          const selectedDate = new Date(formData.date);
          const [hours, minutes] = formData.timeSlot.split(':').map(Number);
          selectedDate.setHours(hours, minutes, 0, 0);
          formattedDateForApi = selectedDate.toISOString();
        }
        // Removed simulation and added real fetch call
        const requestBody = {
          customerName: formData.firstName + ' ' + formData.lastName,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          services: services.find((service) => service.id === formData.serviceId),
          date: formattedDateForApi, // Format the date correctly
          status: 'pending' // The initial status for a new booking
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          // Handle non-success HTTP responses
          const errorData = await response.json();
          console.error("API error:", response.status, errorData);
          // You might want to set an error state here
          setIsSuccess(false); // Assuming not successful if API call fails
        } else {
          // Handle success
          const data = await response.json();
          console.log("API success:", data);
          setIsSuccess(true);
        }

      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSuccess(false); // Assuming not successful if fetch fails
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  // Find selected service
  const selectedService = services.find((service) => service.id === formData.serviceId)
  console.log("selectedService", selectedService)

  if (isSuccess) {
    return <BookingSuccess formData={formData} selectedService={selectedService} />
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step === 1 ? "bg-[#fdc700] text-black" : "bg-[#fdc700] text-black",
              )}
              animate={{ scale: step === 1 ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              1
            </motion.div>
            <div className="ml-2">
              <p className={cn("font-medium", step === 1 ? "text-[#5D5D5D]" : "text-[#5D5D5D]")}>
                Chọn Dịch Vụ & Thời Gian
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-16 h-0.5 bg-[#FFF9E0]"></div>

          <div className="flex items-center">
            <motion.div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step === 2 ? "bg-[#fdc700] text-black" : "bg-[#FFF9E0] text-[#5D5D5D]",
              )}
              animate={{ scale: step === 2 ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              2
            </motion.div>
            <div className="ml-2">
              <p className={cn("font-medium", step === 2 ? "text-[#5D5D5D]" : "text-[#5D5D5D]/60")}>
                Thông Tin Cá Nhân
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 && (
          <AnimatedSection direction="up" className="space-y-6">
            {/* Service selection */}
            <div className="space-y-2">
              <Label htmlFor="service" className="text-[#5D5D5D] text-lg">
                Chọn Dịch Vụ <span className="text-red-500">*</span>
              </Label>
              <ServiceSelector
                services={services}
                selectedServiceId={formData.serviceId}
                onChange={handleServiceChange}
              />
              {errors.serviceId && <p className="text-red-500 text-sm mt-1">{errors.serviceId}</p>}
            </div>

            {/* Date selection */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-[#5D5D5D] text-lg">
                Chọn Ngày <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? (
                      format(formData.date, "EEEE, dd MMMM yyyy", { locale: vi })
                    ) : (
                      <span>Chọn ngày đặt lịch</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateChange}
                    disabled={(date) => {
                      // Disable dates in the past
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return date < today
                    }}
                    locale={vi}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>

            {/* Time slot selection */}
            <div className="space-y-2">
              <Label htmlFor="timeSlot" className="text-[#5D5D5D] text-lg">
                Chọn Giờ <span className="text-red-500">*</span>
              </Label>
              <TimeSlotPicker
                selectedTimeSlot={formData.timeSlot}
                onChange={handleTimeSlotChange}
                selectedDate={formData.date}
              />
              {errors.timeSlot && <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>}
            </div>

            <div className="pt-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors"
                >
                  Tiếp Tục
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        )}

        {step === 2 && (
          <AnimatedSection direction="up" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[#5D5D5D]">
                  Tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border-[#FFF9E0] focus:border-[#fdc700]"
                  placeholder="Nhập tên của bạn"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[#5D5D5D]">
                  Họ <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border-[#FFF9E0] focus:border-[#fdc700]"
                  placeholder="Nhập họ của bạn"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#5D5D5D]">
                  Số Điện Thoại <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="border-[#FFF9E0] focus:border-[#fdc700]"
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#5D5D5D]">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-[#FFF9E0] focus:border-[#fdc700]"
                  placeholder="Nhập địa chỉ email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-[#5D5D5D]">
                Ghi Chú (tùy chọn)
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="border-[#FFF9E0] focus:border-[#fdc700] min-h-[100px]"
                placeholder="Nhập yêu cầu đặc biệt hoặc ghi chú khác"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                className="flex-1 border-[#fdc700] text-[#5D5D5D] hover:bg-[#FFF9E0] hover:text-[#5D5D5D]"
              >
                Quay Lại
              </Button>
              <motion.div className="flex-1" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  className="w-full bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    "Xác Nhận Đặt Lịch"
                  )}
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        )}
      </form>

      {/* Summary of selection */}
      {selectedService && formData.date && formData.timeSlot && (
        <AnimatedSection direction="up" delay={0.3} className="mt-8 p-4 bg-[#FFF9E0] rounded-lg">
          <h3 className="font-medium text-[#5D5D5D] mb-2">Thông tin đặt lịch:</h3>
          <div className="space-y-1 text-[#5D5D5D]">
            <p>
              <span className="font-medium">Dịch vụ:</span> {selectedService.title}
            </p>
            <p>
              <span className="font-medium">Ngày:</span>{" "}
              {formData.date ? format(formData.date, "EEEE, dd/MM/yyyy", { locale: vi }) : ""}
            </p>
            <p>
              <span className="font-medium">Giờ:</span> {formData.timeSlot}
            </p>
            <p>
              <span className="font-medium">Thời gian dự kiến:</span> {selectedService.duration} phút
            </p>
            <p>
              <span className="font-medium">Giá:</span>{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
                minimumFractionDigits: 0,
              }).format(selectedService.price)}
            </p>
          </div>
        </AnimatedSection>
      )}
    </div>
  )
}

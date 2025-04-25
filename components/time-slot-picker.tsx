"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TimeSlotPickerProps {
  selectedTimeSlot: string
  onChange: (timeSlot: string) => void
  selectedDate?: Date
}

export function TimeSlotPicker({ selectedTimeSlot, onChange, selectedDate }: TimeSlotPickerProps) {
  // Generate time slots from 9:00 to 18:00 with 30-minute intervals
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([])
  const [morningSlots, setMorningSlots] = useState<string[]>([])
  const [afternoonSlots, setAfternoonSlots] = useState<string[]>([])

  useEffect(() => {
    // Generate all possible time slots
    const allTimeSlots: string[] = []
    for (let hour = 9; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 18 && minute > 0) continue // Don't go past 18:00

        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        allTimeSlots.push(`${formattedHour}:${formattedMinute}`)
      }
    }

    // Simulate some slots being unavailable based on the selected date
    let availableSlots = [...allTimeSlots]

    if (selectedDate) {
      // Make some slots unavailable based on the day of week
      const dayOfWeek = selectedDate.getDay()

      // For example, make some morning slots unavailable on Mondays (1)
      if (dayOfWeek === 1) {
        availableSlots = availableSlots.filter((slot) => {
          const hour = Number.parseInt(slot.split(":")[0])
          return hour >= 11
        })
      }

      // Make some afternoon slots unavailable on Fridays (5)
      if (dayOfWeek === 5) {
        availableSlots = availableSlots.filter((slot) => {
          const hour = Number.parseInt(slot.split(":")[0])
          return hour < 16
        })
      }

      // Randomly make some slots unavailable for other days
      if (dayOfWeek !== 1 && dayOfWeek !== 5) {
        const unavailableSlots = ["10:00", "11:30", "14:00", "16:30"]
        availableSlots = availableSlots.filter((slot) => !unavailableSlots.includes(slot))
      }
    }

    setAvailableTimeSlots(availableSlots)

    // Split into morning and afternoon
    const morning = availableSlots.filter((slot) => {
      const hour = Number.parseInt(slot.split(":")[0])
      return hour < 12
    })

    const afternoon = availableSlots.filter((slot) => {
      const hour = Number.parseInt(slot.split(":")[0])
      return hour >= 12
    })

    setMorningSlots(morning)
    setAfternoonSlots(afternoon)
  }, [selectedDate])

  return (
    <div className="space-y-4">
      {morningSlots.length > 0 && (
        <div>
          <h4 className="text-[#5D5D5D] font-medium mb-2">Buổi sáng</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {morningSlots.map((timeSlot) => (
              <motion.button
                key={timeSlot}
                type="button"
                onClick={() => onChange(timeSlot)}
                className={cn(
                  "py-2 px-3 rounded-md text-sm font-medium transition-all",
                  selectedTimeSlot === timeSlot
                    ? "bg-[#fdc700] text-black"
                    : "bg-[#FFF9E0] text-[#5D5D5D] hover:bg-[#ffeeb3]",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {timeSlot}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {afternoonSlots.length > 0 && (
        <div>
          <h4 className="text-[#5D5D5D] font-medium mb-2">Buổi chiều</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {afternoonSlots.map((timeSlot) => (
              <motion.button
                key={timeSlot}
                type="button"
                onClick={() => onChange(timeSlot)}
                className={cn(
                  "py-2 px-3 rounded-md text-sm font-medium transition-all",
                  selectedTimeSlot === timeSlot
                    ? "bg-[#fdc700] text-black"
                    : "bg-[#FFF9E0] text-[#5D5D5D] hover:bg-[#ffeeb3]",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {timeSlot}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {availableTimeSlots.length === 0 && selectedDate && (
        <div className="text-center py-4 text-[#5D5D5D]">
          Không có khung giờ trống cho ngày đã chọn. Vui lòng chọn ngày khác.
        </div>
      )}

      {!selectedDate && <div className="text-center py-4 text-[#5D5D5D]">Vui lòng chọn ngày trước khi chọn giờ.</div>}
    </div>
  )
}

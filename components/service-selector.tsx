"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import type { Service } from "@/types/service-types"

interface ServiceSelectorProps {
  services: Service[]
  selectedServiceId?: string
  onChange: (serviceId: string) => void
}

export function ServiceSelector({ services, selectedServiceId, onChange }: ServiceSelectorProps) {
  const [open, setOpen] = useState(false)

  // Group services by category
  const servicesByCategory = services.reduce(
    (acc, service) => {
      const category = service.category.name
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(service)
      return acc
    },
    {} as Record<string, Service[]>,
  )


  const selectedService = services.find((service) => service.id === selectedServiceId)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-[#FFF9E0] hover:border-[#fdc700] hover:bg-[#FFF9E0]"
        >
          {selectedService ? (
            <div className="flex items-center">
              <span>{selectedService.title}</span>
              <span className="ml-2 text-xs text-[#5D5D5D]/70">
                (
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  minimumFractionDigits: 0,
                }).format(selectedService.price)}
                )
              </span>
            </div>
          ) : (
            "Chọn dịch vụ"
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Tìm dịch vụ..." />
          <CommandList>
            <CommandEmpty>Không tìm thấy dịch vụ.</CommandEmpty>
            {Object.keys(servicesByCategory).map((categoryId) => (
              <CommandGroup key={categoryId} heading={categoryId}>
                {servicesByCategory[categoryId].map((service) => (
                  <CommandItem
                    key={service.id}
                    value={service.title}
                    onSelect={() => {
                      onChange(service.id)
                      setOpen(false)
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{service.title}</span>
                      <div className="flex items-center">
                        <span className="text-xs text-[#5D5D5D]/70 mr-2">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                            minimumFractionDigits: 0,
                          }).format(service.price)}
                        </span>
                        <Check
                          className={cn("h-4 w-4", selectedServiceId === service.id ? "opacity-100" : "opacity-0")}
                        />
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

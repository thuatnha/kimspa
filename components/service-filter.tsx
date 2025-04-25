"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ServiceCategory } from "@/types/service-types"

interface ServiceFilterProps {
  categories: ServiceCategory[]
  activeCategory: string
  onChange: (categoryId: string) => void
}

export function ServiceFilter({ categories, activeCategory, onChange }: ServiceFilterProps) {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <motion.div
        className="flex flex-wrap justify-center gap-2 md:gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onChange(category.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeCategory === category.id
                ? "bg-[#fdc700] text-black"
                : "bg-[#FFF9E0] text-[#5D5D5D] hover:bg-[#ffeeb3]",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

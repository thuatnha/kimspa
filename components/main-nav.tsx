"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Trang Chủ" },
    { href: "/services", label: "Dịch Vụ" },
    { href: "/gallery", label: "Thư Viện" },
    { href: "/#testimonials", label: "Đánh Giá" },
    { href: "/#pricing", label: "Bảng Giá" },
    { href: "/#contact", label: "Liên Hệ" },
  ]

  return (
    <nav className={cn("hidden md:flex gap-6", className)}>
      {navItems.map((item, i) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * i }}
          >
            <Link
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors relative group",
                isActive ? "text-[#fdc700]" : "text-[#5D5D5D] hover:text-[#fdc700]",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-[#fdc700] transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full",
                )}
              ></span>
            </Link>
          </motion.div>
        )
      })}
    </nav>
  )
}

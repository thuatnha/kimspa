import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
 
// Logo Black: https://salt.tkbcdn.com/ts/ds/b1/df/50/e3dcc145cc85f16c0d21adb7816910f8.png
// Logo White: https://salt.tkbcdn.com/ts/ds/98/2e/45/8e24983e595a784ec7d394b752d2f7ed.png
const ListMenu = [{
    name: "Dịch Vụ",
    href: "#services",
  },
  {
    name: "Lợi Ích",
    href: "#benefits",
  },
  {
    name: "Thư Viện",
    href: "#gallery",
  },
  {
    name: "Đánh Giá",
    href: "#testimonials",
  },
  {
    name: "Bảng Giá",
    href: "#pricing",
  },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
  
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20)
      }
  
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])
  
    return (
      <motion.header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-[#FFFDF5]/60 transition-all duration-300 ${
          scrolled ? "bg-[#FFFDF5]/95 shadow-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src="https://salt.tkbcdn.com/ts/ds/d7/b8/d6/486cea63fc38a16d1602f83b27b40a57.png" alt="Logo Kim Skin Beauty And Health Care" className="h-auto w-20" />
            {/* <span className="text-xl font-bold text-[#fdc700]">KimSkin</span>
            <span className="text-xl font-light text-[#5D5D5D]">Clinic</span> */}
          </motion.div>
  
          <nav className="hidden md:flex gap-6">
            {ListMenu.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                <Link
                  href={`${item.href}`}
                  className="text-sm font-medium text-[#5D5D5D] hover:text-[#fdc700] transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#fdc700] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>
  
          <motion.div
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="#contact" className="text-sm font-medium text-[#5D5D5D] hover:text-[#fdc700] transition-colors">
              Liên Hệ
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors">Đặt Lịch Ngay</Button>
            </motion.div>
          </motion.div>
  
          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-[#5D5D5D]" /> : <Menu className="h-6 w-6 text-[#5D5D5D]" />}
          </motion.button>
        </div>
  
        {isMenuOpen && (
          <motion.div
            className="container md:hidden py-4 border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-4">
              {["Dịch Vụ", "Lợi Ích", "Thư Viện", "Đánh Giá", "Bảng Giá", "Liên Hệ"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                >
                  <Link
                    href={`#${item === "Thư Viện" ? "gallery" : item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm font-medium text-[#5D5D5D] hover:text-[#fdc700] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="pt-2 border-t"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Button
                  className="w-full bg-[#fdc700] hover:bg-[#e3b400] text-black transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đặt Lịch Ngay
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </motion.header>
    )
}
  
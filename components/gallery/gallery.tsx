"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { cn } from "@/lib/utils"
import type { GalleryItem } from "./gallery-types"
import { AnimatedSection } from "../animated-section"
import Image from "next/image"

interface GalleryProps {
  items: GalleryItem[]
  className?: string
  categories?: string[]
}

export function Gallery({ items, className, categories = ["Tất cả"] }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const filteredItems = activeCategory === "Tất cả" ? items : items.filter((item) => item.category === activeCategory)

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedImage(item)
    setCurrentIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setCurrentIndex(newIndex)
    setSelectedImage(filteredItems[newIndex])
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % filteredItems.length
    setCurrentIndex(newIndex)
    setSelectedImage(filteredItems[newIndex])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
    if (e.key === "Escape") closeLightbox()
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Category Filter */}
      {categories.length > 1 && (
        <AnimatedSection direction="up" className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === category
                  ? "bg-[#fdc700] text-black"
                  : "bg-[#FFF9E0] text-[#5D5D5D] hover:bg-[#ffeeb3]",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </AnimatedSection>
      )}

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
          hidden: {},
        }}
      >
        {filteredItems.map((item, index) => (
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
            onClick={() => openLightbox(item, index)}
          >
            <Image
              src={item.src || "/placeholder.svg"}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: hoveredIndex === index ? 1 : 0.8,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <Expand className="text-white h-8 w-8" />
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: hoveredIndex === index ? 0 : 20,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                {item.description && <p className="text-sm opacity-90">{item.description}</p>}
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.button
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 z-10"
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 z-10"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 z-10"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>

            <div className="w-full max-w-4xl max-h-[80vh] relative" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="relative w-full h-full flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-full h-[60vh]">
                    <Image
                      src={selectedImage.src || "/placeholder.svg"}
                      alt={selectedImage.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 90vw, 70vw"
                    />
                  </div>
                  <div className="text-white text-center mt-4 px-4">
                    <h2 className="text-xl font-semibold">{selectedImage.title}</h2>
                    {selectedImage.description && <p className="mt-2 text-gray-300">{selectedImage.description}</p>}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-0 right-0">
              <div className="flex justify-center gap-2 px-4 overflow-x-auto py-2 max-w-full">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={cn(
                      "w-16 h-16 relative rounded-md overflow-hidden cursor-pointer flex-shrink-0",
                      currentIndex === index && "ring-2 ring-[#fdc700]",
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(index)
                      setSelectedImage(item)
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

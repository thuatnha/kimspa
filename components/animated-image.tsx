"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"

interface AnimatedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  delay?: number
  duration?: number
  effect?: "fade" | "zoom" | "slide" | "pulse"
}

export function AnimatedImage({
  src,
  alt,
  width,
  height,
  className,
  delay = 0,
  duration = 0.5,
  effect = "fade",
}: AnimatedImageProps) {
  const getAnimationVariants = () => {
    switch (effect) {
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }
      case "slide":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }
      case "pulse":
        return {
          hidden: { opacity: 0.6, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.8,
              yoyo: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          },
        }
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={getAnimationVariants()}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn("overflow-hidden", className)}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn("object-cover", className)}
      />
    </motion.div>
  )
}

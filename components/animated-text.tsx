"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedTextProps {
  text: string | ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  duration = 0.05,
  once = true,
  as: Component = "p",
}: AnimatedTextProps) {
  // If text is a ReactNode, render it directly with a simple fade animation
  if (typeof text !== "string") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
        className={className}
      >
        {text}
      </motion.div>
    )
  }

  // For string text, create letter-by-letter animation
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      style={{ overflow: "hidden" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn(className)}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block mr-1" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

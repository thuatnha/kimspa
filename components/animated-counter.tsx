"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  delay?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({
  from,
  to,
  duration = 2,
  delay = 0,
  className,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 })
  const count = useMotionValue(from)
  const springCount = useSpring(count, { duration: duration * 1000, bounce: 0 })
  const rounded = useTransform(springCount, (latest) => Math.round(latest))

  useEffect(() => {
    if (isIntersecting) {
      count.set(to)
    }
  }, [count, isIntersecting, to])

  return (
    <motion.span ref={ref as any} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  )
}

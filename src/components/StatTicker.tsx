import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: 2400, suffix: '+', label: 'Leads Qualified' },
  { value: 94, suffix: '%', label: 'Routing Accuracy' },
  { value: 30, prefix: '<', suffix: 's', label: 'Per Lead' },
]

function CountUp({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <span ref={ref} className="font-mono text-2xl md:text-3xl font-medium" style={{ color: 'var(--accent-primary)' }}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatTicker() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mt-12">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
          className="flex flex-col items-center gap-1 text-center"
        >
          <CountUp target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

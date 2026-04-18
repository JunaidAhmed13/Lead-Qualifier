import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const paragraphs = [
    "I'm Maddy — founder of AskDocs and Chessionic.",
    "I built LeadIQ because qualifying leads manually is a waste of everyone's time. AI does it better, faster, and without bias.",
    "LeadIQ is part of a broader mission: building AI systems that handle repetitive work so humans can focus on what actually matters.",
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen pt-28 pb-24 px-6 flex items-center justify-center"
    >
      <div className="max-w-2xl w-full mx-auto text-center" ref={ref}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs tracking-widest uppercase mb-6"
          style={{ color: 'var(--accent-primary)' }}
        >
          About
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-4xl md:text-5xl mb-10"
          style={{
            fontFamily: 'Instrument Serif, Georgia, serif',
            color: 'var(--text-primary)',
            fontStyle: 'italic',
          }}
        >
          Built by someone who needed it.
        </motion.h1>

        {/* Paragraphs */}
        <div className="space-y-5">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.1 }}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}
            >
              {text}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

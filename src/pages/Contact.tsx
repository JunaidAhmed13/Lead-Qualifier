import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import toast from 'react-hot-toast'

const EMAIL = 'riskryzen@gmail.com'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Could not copy email.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen pt-28 pb-24 px-6 flex items-center justify-center"
    >
      <div className="max-w-lg w-full mx-auto text-center" ref={ref}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs tracking-widest uppercase mb-6"
          style={{ color: 'var(--accent-primary)' }}
        >
          Contact
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-5xl md:text-6xl mb-4"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: 'var(--text-primary)' }}
        >
          Get in touch.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          Have a question or want to work together?
        </motion.p>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8"
        >
          <p className="text-xs mb-2 font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
            Email
          </p>
          <motion.button
            onClick={copyEmail}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="font-mono text-lg px-5 py-3 rounded-xl border inline-flex items-center gap-2 transition-all"
            style={{
              borderColor: copied ? 'var(--success)' : 'var(--border)',
              backgroundColor: 'var(--bg-surface)',
              color: copied ? 'var(--success)' : 'var(--text-primary)',
            }}
            title="Click to copy"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                {EMAIL}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.22 }}
        >
          <Link to="/submit">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(79,110,247,0.4)' }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-xl text-sm font-medium"
              style={{ backgroundColor: 'var(--accent-primary)', color: '#fff' }}
            >
              Submit a Lead →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

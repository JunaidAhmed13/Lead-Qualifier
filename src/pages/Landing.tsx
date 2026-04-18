import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { SignInButton, useAuth } from '@clerk/react'
import StatTicker from '../components/StatTicker'
import HowItWorks from '../components/HowItWorks'

const TECH_LOGOS = [
  { name: 'n8n', label: 'Built on n8n' },
  { name: 'OpenAI', label: 'Powered by OpenAI' },
  { name: 'Airtable', label: 'Stored in Airtable' },
  { name: 'Slack', label: 'Notified via Slack' },
]

function TechBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <section
      ref={ref}
      className="py-12 px-6 border-t border-b"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--section-band-bg)' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4 md:gap-0 md:divide-x"
        style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}
      >
        {TECH_LOGOS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center gap-2 px-6 py-2"
          >
            <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              {t.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default function Landing() {
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmitClick = () => {
    if (isSignedIn) navigate('/submit')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
    >
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center overflow-hidden">
        {/* Animated gradient blob */}
        <div
          className="blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(79,110,247,0.06) 0%, rgba(232,97,42,0.04) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8"
            style={{ borderColor: 'var(--border-bright)', backgroundColor: 'rgba(79,110,247,0.06)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--success)' }}
            />
            <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
              AI-Powered · Now Live
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-6"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            <span style={{ color: 'var(--text-primary)' }}>Qualify Leads.</span>
            <br />
            <em style={{ color: 'var(--accent-primary)' }}>Close Faster.</em>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            AI-powered lead scoring that routes hot prospects to your sales team in under 30 seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {isSignedIn ? (
              <motion.button
                onClick={handleSubmitClick}
                whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(79,110,247,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'var(--accent-primary)', color: '#fff' }}
              >
                Submit a Lead →
              </motion.button>
            ) : (
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(79,110,247,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 rounded-xl text-sm font-medium"
                  style={{ backgroundColor: 'var(--accent-primary)', color: '#fff' }}
                >
                  Submit a Lead →
                </motion.button>
              </SignInButton>
            )}

            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-xl text-sm font-medium border transition-all"
              style={{
                borderColor: 'var(--border-bright)',
                color: 'var(--text-primary)',
              }}
            >
              See How It Works ↓
            </motion.a>
          </motion.div>

          {/* Stat ticker */}
          <StatTicker />
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Tech bar */}
      <TechBar />

      {/* CTA band */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl mb-6"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: 'var(--text-primary)' }}
          >
            Ready to close more deals?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Let AI do the qualifying. You focus on closing.
          </motion.p>
          {isSignedIn ? (
            <Link to="/submit">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(79,110,247,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 rounded-xl text-base font-medium"
                style={{ backgroundColor: 'var(--accent-primary)', color: '#fff' }}
              >
                Get Started Free →
              </motion.button>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(79,110,247,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 rounded-xl text-base font-medium"
                style={{ backgroundColor: 'var(--accent-primary)', color: '#fff' }}
              >
                Get Started Free →
              </motion.button>
            </SignInButton>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 border-t text-center"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          © 2024 LeadIQ · Built by{' '}
          <span style={{ color: 'var(--text-secondary)' }}>Maddy @ Chessionic</span>
        </p>
      </footer>
    </motion.div>
  )
}

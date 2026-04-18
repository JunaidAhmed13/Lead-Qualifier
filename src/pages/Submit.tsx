import { motion } from 'framer-motion'
import LeadForm from '../components/LeadForm'

export default function Submit() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen flex items-center justify-center px-4 py-24"
    >
      <div className="w-full max-w-xl">
        {/* Card */}
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <p
              className="font-mono text-[11px] tracking-widest uppercase mb-3"
              style={{ color: 'var(--accent-primary)' }}
            >
              AI Qualification Form
            </p>
            <h1
              className="text-3xl mb-2"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: 'var(--text-primary)' }}
            >
              Tell us about your project
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Our AI will score and route your submission within 30 seconds.
            </p>
          </div>

          <LeadForm />
        </div>

        {/* Footnote */}
        <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>
          Your data is encrypted and never shared with third parties.
        </p>
      </div>
    </motion.div>
  )
}

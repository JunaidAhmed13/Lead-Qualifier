import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SuccessAnimation from '../components/SuccessAnimation'

function ScoreTeaser() {
  return (
    <div
      className="rounded-xl p-6 mt-8"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>
          LEAD SCORE
        </span>
        <span
          className="font-mono text-xs px-2 py-0.5 rounded"
          style={{ color: 'var(--warning)', backgroundColor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}
        >
          ANALYZING
        </span>
      </div>

      {/* Pulsing skeleton bars */}
      {[80, 60, 45].map((w, i) => (
        <motion.div
          key={i}
          className="h-2.5 rounded-full mb-3 shimmer"
          style={{ width: `${w}%` }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="flex items-center gap-2 mt-4">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: 'var(--accent-primary)' }}
        />
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Your lead is being analyzed by AI...
        </span>
      </div>
    </div>
  )
}

export default function Success() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen flex items-center justify-center px-4 py-24"
    >
      <div className="w-full max-w-md text-center">
        {/* Checkmark animation */}
        <SuccessAnimation />

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-4xl md:text-5xl mt-8 mb-4"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: 'var(--text-primary)' }}
        >
          You're in the queue.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="text-base leading-relaxed mb-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          Our AI has received your submission and is scoring it now.
          Expect a response within 24 hours.
        </motion.p>

        {/* Score teaser */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <ScoreTeaser />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 mt-8"
        >
          <Link to="/submit" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(79,110,247,0.3)' }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl text-sm font-medium"
              style={{ backgroundColor: 'var(--accent-primary)', color: '#fff' }}
            >
              Submit Another Lead
            </motion.button>
          </Link>
          <Link to="/" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl text-sm font-medium border transition-all"
              style={{ borderColor: 'var(--border-bright)', color: 'var(--text-secondary)' }}
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

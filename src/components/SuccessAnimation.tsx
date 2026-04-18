import { motion } from 'framer-motion'

function Particle({ angle, distance }: { angle: number; distance: number }) {
  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * distance
  const y = Math.sin(rad) * distance
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      className="absolute w-1.5 h-1.5 rounded-full"
      style={{
        top: '50%',
        left: '50%',
        marginTop: -3,
        marginLeft: -3,
        backgroundColor: angle % 60 === 0 ? 'var(--accent-secondary)' : 'var(--accent-primary)',
      }}
    />
  )
}

export default function SuccessAnimation() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    distance: 48 + (i % 3) * 12,
  }))

  return (
    <div className="relative flex items-center justify-center w-24 h-24 mx-auto">
      {/* Outer ring pulse */}
      <motion.div
        initial={{ scale: 0, opacity: 0.6 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: 'rgba(34, 211, 122, 0.2)' }}
      />

      {/* Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'rgba(34, 211, 122, 0.12)', border: '2px solid #22d37a' }}
      >
        {/* Checkmark SVG draw */}
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <motion.path
            d="M8 18l7 7 13-14"
            stroke="#22d37a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} angle={p.angle} distance={p.distance} />
      ))}
    </div>
  )
}

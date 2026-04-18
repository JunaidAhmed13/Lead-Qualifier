import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const STEPS = [
  {
    number: '01',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
        <path d="M11 13l9.5-9.5M15 4h5v5" />
      </svg>
    ),
    title: 'Submit',
    description: 'Fill out the lead form with your project details, budget, and timeline. Takes under 60 seconds.',
  },
  {
    number: '02',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        <circle cx="12" cy="17" r=".5" fill="currentColor" />
      </svg>
    ),
    title: 'AI Scores',
    description: 'OpenAI analyzes budget, intent, and project fit to generate a lead quality score in real time.',
  },
  {
    number: '03',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22l-4-9-9-4 20-7z" />
      </svg>
    ),
    title: 'Auto-Route',
    description: 'Hot leads route directly to your sales team via Slack. Cooler leads enter the nurture sequence.',
  },
]

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs tracking-widest mb-3" style={{ color: 'var(--accent-primary)' }}>
            HOW IT WORKS
          </p>
          <h2 className="text-3xl md:text-4xl font-serif" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
            From submission to decision
            <br />
            <em style={{ color: 'var(--accent-secondary)' }}>in under 30 seconds.</em>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative flex flex-col md:flex-row items-stretch gap-0 md:gap-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex-1 flex flex-col md:flex-row items-start md:items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.15 }}
                className="flex-1 rounded-xl p-6 md:p-8 group relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                }}
                whileHover={{ borderColor: 'var(--border-bright)', y: -2 }}
              >
                {/* Step number badge */}
                <div
                  className="font-mono text-xs font-medium mb-4 inline-block px-2 py-1 rounded"
                  style={{
                    color: 'var(--accent-primary)',
                    backgroundColor: 'rgba(79,110,247,0.1)',
                    border: '1px solid rgba(79,110,247,0.2)',
                  }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="mb-4 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}
                >
                  {step.icon}
                </div>

                <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>

                {/* Subtle glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(79,110,247,0.04), transparent 70%)' }}
                />
              </motion.div>

              {/* Connector */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:flex items-center px-2">
                  <div
                    className="w-12 border-t border-dashed"
                    style={{ borderColor: 'var(--border-bright)' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

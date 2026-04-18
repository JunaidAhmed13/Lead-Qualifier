import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import SegmentedSelector from './SegmentedSelector'
import { useFormPersist } from '../hooks/useFormPersist'

const BUDGET_OPTIONS = ['Under $1k', '$1k–$5k', '$5k–$10k', '$10k+']
const TIMELINE_OPTIONS = ['ASAP', '1–3 months', '3–6 months', '6+ months']
const TOTAL_FIELDS = 6

interface FormState {
  name: string
  email: string
  company: string
  budget: string
  timeline: string
  message: string
}

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  company: '',
  budget: '',
  timeline: '',
  message: '',
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-mono text-[11px] tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
      {children}
    </label>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  shaking?: boolean
}

function StyledInput({ hasError, shaking, className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 ${shaking ? 'shake' : ''} ${className}`}
      style={{
        backgroundColor: 'var(--bg-elevated)',
        border: `1px solid ${hasError ? 'var(--danger)' : 'var(--border)'}`,
        color: 'var(--text-primary)',
        fontFamily: 'Geist, sans-serif',
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = hasError ? 'var(--danger)' : 'var(--border-bright)'
        e.currentTarget.style.boxShadow = hasError
          ? '0 0 0 3px rgba(239,68,68,0.1)'
          : '0 0 0 3px rgba(79,110,247,0.1)'
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = hasError ? 'var(--danger)' : 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      {...props}
    />
  )
}

export default function LeadForm() {
  const { user } = useUser()
  const navigate = useNavigate()
  const { savedForm, saveForm, clearForm } = useFormPersist()
  const [form, setForm] = useState<FormState>(() => ({
    ...EMPTY_FORM,
    email: user?.primaryEmailAddress?.emailAddress || '',
    name: user?.fullName || '',
    ...savedForm,
  }))
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [shaking, setShaking] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        email: f.email || user.primaryEmailAddress?.emailAddress || '',
        name: f.name || user.fullName || '',
      }))
    }
  }, [user])

  useEffect(() => {
    saveForm(form)
  }, [form, saveForm])

  const filledCount = [
    form.name,
    form.email,
    form.company,
    form.budget,
    form.timeline,
    form.message,
  ].filter(Boolean).length

  const progress = (filledCount / TOTAL_FIELDS) * 100

  const set = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const validate = () => {
    const e: Partial<Record<keyof FormState, boolean>> = {}
    if (!form.name.trim()) e.name = true
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true
    if (!form.company.trim()) e.company = true
    if (!form.budget) e.budget = true
    if (!form.timeline) e.timeline = true
    if (!form.message.trim() || form.message.length < 10) e.message = true
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      toast.error('Please fill in all required fields.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/.netlify/functions/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      clearForm()
      toast.success('Lead submitted! AI is scoring now.')
      navigate('/success')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Cmd/Ctrl+Enter submits from textarea
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  const fieldVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.35 },
    }),
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Progress bar */}
      <div className="h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: 'var(--accent-primary)' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Name */}
      <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
        <Label>Full Name *</Label>
        <StyledInput
          type="text"
          placeholder="Jane Smith"
          value={form.name}
          onChange={(e) => { set('name')(e.target.value); setErrors((er) => ({ ...er, name: false })) }}
          hasError={errors.name}
          shaking={shaking && errors.name}
          autoComplete="name"
        />
      </motion.div>

      {/* Email */}
      <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
        <Label>Email Address *</Label>
        <StyledInput
          type="email"
          placeholder="jane@company.com"
          value={form.email}
          onChange={(e) => { set('email')(e.target.value); setErrors((er) => ({ ...er, email: false })) }}
          hasError={errors.email}
          shaking={shaking && errors.email}
          autoComplete="email"
        />
      </motion.div>

      {/* Company */}
      <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
        <Label>Company *</Label>
        <StyledInput
          type="text"
          placeholder="Acme Inc."
          value={form.company}
          onChange={(e) => { set('company')(e.target.value); setErrors((er) => ({ ...er, company: false })) }}
          hasError={errors.company}
          shaking={shaking && errors.company}
          autoComplete="organization"
        />
      </motion.div>

      {/* Budget */}
      <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
        <Label>Project Budget *</Label>
        <SegmentedSelector
          options={BUDGET_OPTIONS}
          value={form.budget}
          onChange={(v) => { set('budget')(v); setErrors((er) => ({ ...er, budget: false })) }}
          name="budget"
        />
        {errors.budget && (
          <p className="text-xs mt-1.5" style={{ color: 'var(--danger)' }}>Please select a budget range.</p>
        )}
      </motion.div>

      {/* Timeline */}
      <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
        <Label>Timeline *</Label>
        <SegmentedSelector
          options={TIMELINE_OPTIONS}
          value={form.timeline}
          onChange={(v) => { set('timeline')(v); setErrors((er) => ({ ...er, timeline: false })) }}
          name="timeline"
        />
        {errors.timeline && (
          <p className="text-xs mt-1.5" style={{ color: 'var(--danger)' }}>Please select a timeline.</p>
        )}
      </motion.div>

      {/* Project Details */}
      <motion.div custom={5} variants={fieldVariants} initial="hidden" animate="visible">
        <Label>Project Details *</Label>
        <div className="relative">
          <textarea
            ref={textareaRef}
            rows={5}
            placeholder="Describe your goals, challenges, and what success looks like..."
            value={form.message}
            onChange={(e) => { set('message')(e.target.value); setErrors((er) => ({ ...er, message: false })) }}
            onKeyDown={handleTextareaKeyDown}
            className={`w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 resize-none ${shaking && errors.message ? 'shake' : ''}`}
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: `1px solid ${errors.message ? 'var(--danger)' : 'var(--border)'}`,
              color: 'var(--text-primary)',
              fontFamily: 'Geist, sans-serif',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = errors.message ? 'var(--danger)' : 'var(--border-bright)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,110,247,0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = errors.message ? 'var(--danger)' : 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
          {/* Character counter */}
          <span
            className="absolute bottom-3 right-3 font-mono text-[10px]"
            style={{ color: form.message.length > 1000 ? 'var(--warning)' : 'var(--text-muted)' }}
          >
            {form.message.length}
          </span>
        </div>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          Tip: Press ⌘+Enter to submit
        </p>
      </motion.div>

      {/* Submit */}
      <motion.div custom={6} variants={fieldVariants} initial="hidden" animate="visible">
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={!submitting ? { scale: 1.02, boxShadow: '0 0 24px rgba(79,110,247,0.35)' } : {}}
          whileTap={!submitting ? { scale: 0.98 } : {}}
          className="w-full py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
          style={{
            backgroundColor: submitting ? 'var(--border-bright)' : 'var(--accent-primary)',
            color: '#fff',
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing your lead...
            </>
          ) : (
            'Submit for AI Scoring →'
          )}
        </motion.button>
      </motion.div>
    </form>
  )
}

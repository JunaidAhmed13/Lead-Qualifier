import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth, SignInButton, UserButton } from '@clerk/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDarkMode } from '../hooks/useDarkMode'

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="7" fill="var(--bg-surface)" stroke="var(--border)" />
      <path d="M8 24L16 8L24 24" stroke="#4f6ef7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 19H21" stroke="#4f6ef7" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="8" r="2" fill="#e8612a" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, toggle } = useDarkMode()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'var(--bg-nav-scrolled)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <LogoMark />
            <span
              className="text-xl tracking-tight"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: 'var(--text-primary)' }}
            >
              LeadIQ
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-sm transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {l.label}
              </Link>
            ))}

            {/* Theme toggle */}
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg border transition-all"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
              }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {isDark ? <MoonIcon /> : <SunIcon />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/submit')}
                  className="text-sm px-4 py-2 rounded-lg font-medium"
                  style={{ backgroundColor: 'var(--accent-primary)', color: '#fff' }}
                >
                  Submit Lead
                </motion.button>
                <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
              </div>
            ) : (
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 16px rgba(79,110,247,0.25)' }}
                  whileTap={{ scale: 0.98 }}
                  className="text-sm px-4 py-2 rounded-lg border font-medium"
                  style={{ borderColor: 'var(--border-bright)', color: 'var(--text-primary)' }}
                >
                  Sign In
                </motion.button>
              </SignInButton>
            )}
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <motion.button
              onClick={toggle}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg border"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </motion.button>

            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setDrawerOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={drawerOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5"
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
              <motion.span
                animate={drawerOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5"
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
              <motion.span
                animate={drawerOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5"
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden border-b"
            style={{
              backgroundColor: 'var(--bg-nav-drawer)',
              backdropFilter: 'blur(16px)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-base py-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {l.label}
                </Link>
              ))}
              {isSignedIn ? (
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => navigate('/submit')}
                    className="flex-1 text-sm px-4 py-2.5 rounded-lg font-medium"
                    style={{ backgroundColor: 'var(--accent-primary)', color: '#fff' }}
                  >
                    Submit Lead
                  </button>
                  <UserButton />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button
                    className="w-full text-sm px-4 py-2.5 rounded-lg border font-medium"
                    style={{ borderColor: 'var(--border-bright)', color: 'var(--text-primary)' }}
                  >
                    Sign In
                  </button>
                </SignInButton>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

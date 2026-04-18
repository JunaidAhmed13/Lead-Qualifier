import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem('leadiq-theme')
      if (stored !== null) return stored !== 'light'
    } catch {
      // localStorage blocked
    }
    return true // default dark
  })

  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.remove('light')
    } else {
      html.classList.add('light')
    }
    try {
      localStorage.setItem('leadiq-theme', isDark ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }, [isDark])

  // Apply stored preference on first paint (avoids flash)
  useEffect(() => {
    const stored = localStorage.getItem('leadiq-theme')
    if (stored === 'light') document.documentElement.classList.add('light')
  }, [])

  return { isDark, toggle: () => setIsDark((d) => !d) }
}

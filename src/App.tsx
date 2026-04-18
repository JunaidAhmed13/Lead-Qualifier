import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Submit from './pages/Submit'
import Success from './pages/Success'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/submit"
            element={
              <ProtectedRoute>
                <Submit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <Success />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0f0f1a',
            color: '#f2f2f8',
            border: '1px solid #1e1e35',
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#22d37a', secondary: '#0f0f1a' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#0f0f1a' },
          },
        }}
      />
    </>
  )
}
